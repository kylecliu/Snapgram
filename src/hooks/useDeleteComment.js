import React, { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import { arrayRemove, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import usePostStore from '../store/postStore'
import useCommentStore from '../store/CommentStore'

const useDeleteComment = () => {

    const [isDeletingComment, setIseDeletingComment ] = useState(false)
    const toast = useDisplayToast()
    const {deleteCommentInPost} = usePostStore()
    const {deleteComment: deleteCommentStore} = useCommentStore()
    const deleteComment = async(comment) => {

        if (isDeletingComment) return 

        setIseDeletingComment(true)

        try {

            const commentRef = doc(firestore, "comments", comment.commentId)

            await deleteDoc(commentRef);

            const postRef = doc(firestore, "posts", comment.postId)

            await updateDoc(postRef, {

                comments: arrayRemove(comment.commentId)

            })

            deleteCommentInPost(comment)

            deleteCommentStore(comment)

            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIseDeletingComment(false)

        }

    }

    return { isDeletingComment, deleteComment }

}

export default useDeleteComment
