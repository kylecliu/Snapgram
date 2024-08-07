import React, { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useGetUserPosts from './useGetUserPosts';
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
                createdAt: Date.now(),
                liked: false
            }

            console.log("1")
            console.log(id)
            console.log(newComment)

            const postRef = doc(firestore, "posts", id);

            console.log("2")

            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
              });

            console.log('3')

            addCommentToPost(id, newComment)

            console.log('4')

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

