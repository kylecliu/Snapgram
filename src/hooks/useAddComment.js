import { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { arrayUnion, doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';
import useCommentStore from '../store/CommentStore';

const useAddComment = () => {
    
    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const {addCommentToPost} = usePostStore()
    const {addComment: addCommentStore} = useCommentStore()

    const addComment = async(postId, comment) => {

        if(isUpdating) return

        setIsUpdating(true)

        if(!authUser) return toast("Error", "You need to log in to comment", "error")

        try {

            const newComment = {

                comment: comment,
                createdBy: authUser.uid,
                createdAt: Date.now(),
                likedBy: [],
                postId: postId
            }

            const docRef = await addDoc(collection(firestore, "comments"), newComment);

            const commentRef = doc(firestore, "comments", docRef.id)

            await updateDoc(commentRef, {
                commentId: docRef.id
            })

            const postRef = doc(firestore, "posts", postId);

            await updateDoc(postRef, {
                comments: arrayUnion(docRef.id)
              });

            addCommentToPost(postId, docRef.id)
            addCommentStore({...newComment, postId: postId})

            toast("Success", "Comment added!", "success")

        } catch(error) {

            toast("Error", `${error.name} and ${error.message}`, "error")

        } finally {

            setIsUpdating(false)
        }

    }

    return {addComment}

}

export default useAddComment

