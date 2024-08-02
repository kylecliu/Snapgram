import React, { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import useAuthStore from '../store/AuthStore';
import useUserProfileStore from '../store/ProfileStore';

const useDeletePost = () => {

    const [isDeleting, SetIsDeleting] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    const {userProfile, setUserProfile} = useUserProfileStore()
    const { posts, deletePost} = usePostStore() 

    const deletePostHandler = async(id) => {

        SetIsDeleting(true)

        try{

            const storage = getStorage();

            const desertRef = ref(storage, `photos/${id}`);

            await deleteObject(desertRef)

            deletePost(id);

            setUserProfile({...userProfile, posts: posts})

            const userRef = doc(firestore, "users", authUser.uid);

            await updateDoc(userRef, {
                posts: arrayRemove(id)
              });

            await deleteDoc(doc(firestore, "posts", id));

            toast("Success", "Post deleted!", "success")


        } catch(error) {

            toast("Error", error.message, "error")

        } finally {

            SetIsDeleting(false)
        }



    }

    return {isDeleting, deletePostHandler}

}

export default useDeletePost
