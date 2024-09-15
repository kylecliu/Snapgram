import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase'
import useDisplayToast from './useDisplayToast'

const useGetComments = (post) => {

    const [isFetchingComments, setIsFetchingComments] = useState(false)
    const toast = useDisplayToast()
    const [comments, setComments] = useState([])
    const GetComments = async() => {

      setIsFetchingComments(true) 

        try {

            const q = query(collection(firestore, "comments"), where("postId", "==", post.id));
            const querySnapshot = await getDocs(q);

            let docs = [];

            querySnapshot.forEach((doc) => {
                
                docs.push(doc.data())

            });

            //Sort by timestamp
            docs.sort((a, b) => a.createdAt - b.createdAt)

            setComments(docs)

        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetchingComments(false)
            
        }

    }


    useEffect(() => {

        GetComments()

    }, [post.comments.length])

    return {isFetchingComments, comments}

}

export default useGetComments
