import { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useAddComment = () => {
    
    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const {addCommentToPost} = usePostStore()

    const addComment = async(id, comment) => {

        setIsUpdating(true)

        if(!authUser) return toast("Error", "You need to log in to comment", "error")

        try {

            const newComment = {
                photo: authUser.profileURL,
                username: authUser.username,
                comment: comment,
                createdAt: Date.now()
            }

            const postRef = doc(firestore, "posts", id);

            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
              });

            addCommentToPost(id, newComment)

            toast("Success", "Comment added!", "success")

        } catch(error) {

            toast("Error", `${error.name} and ${error.message}`, "error")

        } finally {

            setIsUpdating(false)
        }

    }

    return {isUpdating, addComment}

}

export default useAddComment

