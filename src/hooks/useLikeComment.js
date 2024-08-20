import { useEffect, useState } from 'react'
import useDisplayToast from './useDisplayToast'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/AuthStore'
import useCommentStore from '../store/CommentStore'

const useLikeComment = (comment) => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const [isLiked, setIsLiked] = useState(false)
    const {likeComment: likeCommentStore, unlikeComment} = useCommentStore()
    const checkIsLikedComment = async(comment) => {

        if(!authUser) return 

        try {

            const commentRef = doc(firestore, "comments", comment?.commentId)

            const docSnap = await getDoc(commentRef);

            if(docSnap.exists()) {

                const commentDoc = docSnap.data()

                commentDoc.likedBy.includes(authUser.uid) ? setIsLiked(true) : setIsLiked(false)

            }

            
        } catch (error) {

            toast("Error", error.message, "error")
            
        }

    }

    const likeComment = async(commentInput) => {

        if(isUpdating || !authUser) return 

        setIsUpdating(true)

        try {

            const commentRef = doc(firestore, "comments", commentInput?.commentId)

            const docSnap = await getDoc(commentRef);

            
            if (docSnap.exists()) {
                
                const commentDoc = docSnap.data()

                if(commentDoc.likedBy.includes(authUser.uid)) {

                    await updateDoc(commentRef, {

                        likedBy: arrayRemove(authUser.uid) 
        
                    })

                    setIsLiked(false)
                    // unlikeComment(commentInput, authUser.uid)

                } else {

                    await updateDoc(commentRef, {

                        likedBy: arrayUnion(authUser.uid) 
        
                    })

                    setIsLiked(true)
                    // likeCommentStore(commentInput, authUser.uid)

                }

            } else {
                
                toast("Error", "Comment does not exist!", "error")

                return
            
            }

            
        } catch (error) {
            
            toast("Error", error.message, "error")
 
        } finally {

            setIsUpdating(false)

        }


    }

    useEffect(() => {

        checkIsLikedComment(comment)

    }, [comment])

    return {isLiked, isUpdating, likeComment}

}

export default useLikeComment

