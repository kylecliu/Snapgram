import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/AuthStore'
import useDisplayToast from './useDisplayToast'

const useLikeComment = (comment) => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const [isLiked, setIsLiked] = useState(false)
    const checkIsLikedComment = async(comment) => {

        //prevent checking when user is not logged in
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

        if (!authUser) return toast ("Info", "You need to log in to like a comment!", "info")

        if (isUpdating) return 

        setIsUpdating(true)

        try {

            const commentRef = doc(firestore, "comments", commentInput?.commentId)

            const docSnap = await getDoc(commentRef);

            if (docSnap.exists()) {
                
                const commentDoc = docSnap.data()

                //if the comment is already liked by the user, set it equal to unliked
                if(commentDoc.likedBy.includes(authUser.uid)) {

                    await updateDoc(commentRef, {

                        likedBy: arrayRemove(authUser.uid) 
        
                    })

                    setIsLiked(false)

                } else {

                    //if the comment is unliked, set it equal to liked
                    await updateDoc(commentRef, {

                        likedBy: arrayUnion(authUser.uid) 
        
                    })

                    setIsLiked(true)
                    
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
        
        //keep track of whether a comment is liked 
        checkIsLikedComment(comment)

    }, [comment])

    return {isLiked, isUpdating, likeComment}

}

export default useLikeComment

