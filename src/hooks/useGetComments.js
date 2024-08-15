import { useState, useEffect } from 'react'
import useDisplayToast from './useDisplayToast'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useCommentStore from '../store/CommentStore'

const useGetComments = (postIds) => {

    const [isFetchingComments, setIsFetchingComments] = useState(false)
    const toast = useDisplayToast()
    const {comments, setComments} = useCommentStore()
    const GetComments = async() => {

        if (postIds.length === 0) return

        setIsFetchingComments(true) 

        try {

            const q = query(collection(firestore, "comments"), where("postId", "in", postIds));
            const querySnapshot = await getDocs(q);

            let docs = [];

            querySnapshot.forEach((doc) => {
                
                docs.push(doc.data())

            });

            docs.sort((a, b) => a.createdAt - b.createdAt)

            setComments(docs)

        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetchingComments(false)

            console.log("getComments")
            
        }

    }


    useEffect(() => {

        GetComments()

        console.log()

        console.log(comments)

    }, [postIds])

    return {isFetchingComments, comments}

}

export default useGetComments
