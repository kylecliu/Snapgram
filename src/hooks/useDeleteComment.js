import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { firestore } from '../firebase/firebase'
import useCommentStore from '../store/CommentStore'
import usePostStore from '../store/postStore'
import useDisplayToast from './useDisplayToast'

const useDeleteComment = () => {

    const [isDeletingComment, setIseDeletingComment ] = useState(false)
    const toast = useDisplayToast()
    const {deleteCommentInPost} = usePostStore()
    const {deleteComment: deleteCommentStore} = useCommentStore()
    const deleteComment = async(comment) => {

        if (isDeletingComment) return 

        setIseDeletingComment(true)

        try {

            //deletes the comment from the comments collection
            const commentRef = doc(firestore, "comments", comment.commentId)

            await deleteDoc(commentRef);

            //deletes the reference in the post
            const postRef = doc(firestore, "posts", comment.postId)

            await updateDoc(postRef, {

                comments: arrayRemove(comment.commentId)

            })

            //Updates the post and comment store
            deleteCommentInPost(comment)

            deleteCommentStore(comment)

            toast("Success", "Comment deleted!", "success")

            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIseDeletingComment(false)

        }

    }

    return { isDeletingComment, deleteComment }

}

export default useDeleteComment
