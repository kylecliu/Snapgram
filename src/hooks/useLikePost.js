import { useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

const useLikePost = (post) => {

    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const toast = useDisplayToast()
    const {posts, likePostStore, unlikePostStore} = usePostStore()

    const checkIsLiked = async(post) => {

        try {

            const postRef = doc(firestore, "posts", post.id)
            const docSnap = await getDoc(postRef)

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

        if(!authUser) return toast("Error", "Please log in to proceed", "error")

        setIsLoading(true)

        try {

            const postRef = doc(firestore, "posts", post.id)
            const docSnap = await getDoc(postRef)

            const postToUpdate = docSnap.data()

            if(postToUpdate.likes.includes(authUser.uid)) {//remove like

                console.log("authUser.uid exists")
                console.log(authUser.uid)

                await updateDoc(postRef, {
                    likes: arrayRemove(authUser.uid)
                })

                setIsLiked(false)

                console.log("Before")
                console.log(posts)

                unlikePostStore(post.id, authUser.uid)

                console.log("After")
                console.log(posts)


            } else {//Add like
                
                console.log("authUser.uid doesn't exist")
                console.log(authUser.uid)

                await updateDoc(postRef, {

                    likes: arrayUnion(authUser.uid)
                })

                setIsLiked(true)

                console.log("Before")
                console.log(posts)

                likePostStore(post.id, authUser.uid)

                console.log("After")
                console.log(posts)

            } 

        } catch(e) {

            toast("Error", e.message, "error")

        } finally {

            setIsLoading(false)
        }

    }

    useEffect(() => {

        checkIsLiked(post)
    
      }, [post])

    return { isLiked, likePost, isLoading }

 
}

export default useLikePost
