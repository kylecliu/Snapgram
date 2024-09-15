import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useCommentStore from '../store/CommentStore';
import usePostStore from '../store/postStore';
import useDisplayToast from './useDisplayToast';

const useAddComment = () => {
    
    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const {addCommentToPost} = usePostStore()
    const {addComment: addCommentStore} = useCommentStore()

    const addComment = async(postId, comment) => {

        if(!authUser) return toast("Info", "You need to log in to comment", "info")

        if(isUpdating) return

        setIsUpdating(true)    

        try {

            const newComment = {

                comment: comment,
                createdBy: authUser.uid,
                createdAt: Date.now(),
                likedBy: [],
                postId: postId

            }

            //Create a new document in the comments collection and retrieve its ID
            const docRef = await addDoc(collection(firestore, "comments"), newComment);

            const commentRef = doc(firestore, "comments", docRef.id)

            //Adding its ID to the document
            await updateDoc(commentRef, {
                commentId: docRef.id
            })

            //Adding the comment ID to the post
            const postRef = doc(firestore, "posts", postId);

            await updateDoc(postRef, {
                comments: arrayUnion(docRef.id)
              });
            
            //Updating post and comment store
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

