import { useState, useEffect } from 'react'
import useDisplayToast from './useDisplayToast'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useCommentStore from '../store/CommentStore'

const useGetComments = (post) => {

    const [isFetchingComments, setIsFetchingComments] = useState(false)
    const toast = useDisplayToast()
    // const {comments, setComments} = useCommentStore()
    const [comments, setComments] = useState([])
    const GetComments = async() => {

        // if (postIds.length === 0) return
        console.log(post)
            

        setIsFetchingComments(true) 

        try {

            console.log("Getcomments start")

            const q = query(collection(firestore, "comments"), where("postId", "==", post.id));
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

        console.log('getCimments useEffect fired')

    }, [post.comments.length])

    return {isFetchingComments, comments}

}

export default useGetComments
