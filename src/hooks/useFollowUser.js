import useAuthStore from '../store/AuthStore'
import { firestore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useDisplayToast from './useDisplayToast';
import useUserProfileStore from '../store/ProfileStore';
import { useEffect, useState } from 'react';



const useFollowUser = (userId) => {

    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const setAuthUser = useAuthStore(state => state.setAuthUser)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)
    const toast = useDisplayToast();

    
    useEffect(() => {

        if(authUser.following.includes(userId)) {

            setIsFollowing(true)
        }
        
    }, [authUser, userId])


    const followOrUnfollowUser = async() => {

        setIsUpdating(true)


            const currentUserRef = doc(firestore, "users", authUser.uid)
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId)

            try {

                await updateDoc(currentUserRef, {
                    following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
                })

                await updateDoc(userToFollowOrUnfollowRef, {
                    followers: isFollowing? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
                })


            } catch(error) {

                toast("Error", error.message, "error")

            }


            if(isFollowing) {
                //Unfollow target user
                //Remove target user and update user store, userProfile store and local storage
                const updatedAuthUser = {
                    ...user,
                    following: authUser.following.filter((item) => item !== userId)
                }

                setAuthUser(updatedAuthUser)
                localStorage.setItem('user-info', JSON.stringify(updatedAuthUser));

                setUserProfile(...userProfile, userProfile.follows.filter((item) => item !== authUser.uid))

                setIsFollowing(false)

            } else {
                //Follow target user
                //Add target user and update user store, userProfile store and local storage
                const updatedAuthUser = {
                    ...user,
                    following: authUser.following.push(userId)
                }

                setAuthUser(updatedAuthUser)
                localStorage.setItem('user-info', JSON.stringify(updatedAuthUser));

                setUserProfile(...userProfile, userProfile.follows.push(authUser.uid))

                setIsFollowing(true)

            }

            setIsUpdating(false)

    } 

    return { isUpdating, isFollowing, followOrUnfollowUser }

}

export default useFollowUser
