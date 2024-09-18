import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import usePostStore from '../store/postStore';
import useDisplayToast from './useDisplayToast';

const useLikePost = (post) => {

    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const toast = useDisplayToast()
    const {likePostStore, unlikePostStore} = usePostStore()

    const checkIsLiked = async(post) => {

        //prevent checking when user is not logged in
        if (!authUser) return

        try {

            const postRef = doc(firestore, "posts", post.id)
            const docSnap = await getDoc(postRef)

            if (!docSnap.exists) {

                return toast("Error", "Something went wrong!", "error")

            }

            const postToUpdate = docSnap.data()

            if (postToUpdate.likes.includes(authUser.uid)) {

                setIsLiked(true)

            } else {

                setIsLiked(false)
            }

        } catch(error) {

            toast("Error", error.message, "error")
        }

    }

    const likePost = async(post) => {

        if(!authUser) return toast("Info", "Please log in to proceed", "info")
        
        if(isLoading) return

        setIsLoading(true)

        try {

            const postRef = doc(firestore, "posts", post.id)
            const docSnap = await getDoc(postRef)

            if (!docSnap.exists) {

                return toast("Error", "Something went wrong!", "error")

            }

            const postToUpdate = docSnap.data()

            if(postToUpdate.likes.includes(authUser.uid)) {

                //unlike the post if it has already been liked
                await updateDoc(postRef, {
                    likes: arrayRemove(authUser.uid)
                })

                setIsLiked(false)

                //Update post store
                unlikePostStore(post.id, authUser.uid)

            } else {
                
                //like this post if it has not been liked
                await updateDoc(postRef, {

                    likes: arrayUnion(authUser.uid)
                })

                setIsLiked(true)

                //Update post store
                likePostStore(post.id, authUser.uid)

            } 

        } catch(e) {

            toast("Error", e.message, "error")

        } finally {

            setIsLoading(false)
        }

    }

    useEffect(() => {

        checkIsLiked(post)
    
      }, [post, authUser])

    return { isLiked, likePost, isLoading }


}

export default useLikePost
