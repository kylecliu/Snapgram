import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useUserProfileStore from '../store/ProfileStore';
import useDisplayToast from './useDisplayToast';



const useFollowUser = (userId) => {

    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const setAuthUser = useAuthStore(state => state.setUser)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)
    const toast = useDisplayToast();

    
    useEffect(() => {

        if(authUser && authUser.following.includes(userId)) {

            setIsFollowing(true)
        }
        
    }, [authUser, userId])


    const followOrUnfollowUser = async() => {

        if(!authUser) return toast("Info", "Please log in to proceed", "info")

        if(isUpdating) return

        setIsUpdating(true)


            const currentUserRef = doc(firestore, "users", authUser.uid)
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId)

            try {
                //Adding or removing user from the following list
                await updateDoc(currentUserRef, {
                    following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
                })
                //Adding or removing user from the followers list
                await updateDoc(userToFollowOrUnfollowRef, {
                    followers: isFollowing? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
                })


            } catch(error) {

                toast("Error", error.message, "error")

            }


            if(isFollowing) {
                //Unfollow target user: remove target user and update user store, userProfile store and local storage
                const updatedAuthUser = {
                    ...authUser,
                    following: authUser.following.filter((item) => item !== userId)
                }

                setAuthUser(updatedAuthUser)

                //Only updating userProfile if there is one, which means on a ProfilePage and not on homepage to avoid errors
                if (userProfile) {

                    setUserProfile({...userProfile, followers: userProfile.followers.filter((item) => item !== authUser.uid)})

                }

                setIsFollowing(false)

            } else {
                //Follow target user: add target user and update user store, userProfile store and local storage
                const updatedAuthUser = {
                    ...authUser,
                    following: [...authUser.following, userId]
                }

                setAuthUser(updatedAuthUser)

                //Only updating userProfile if there is one, which means on a ProfilePage and not on homepage to avoid errors
                if (userProfile) {
                    
                    setUserProfile({...userProfile, followers: [...userProfile.followers, authUser.uid]})

                }

                setIsFollowing(true)

            }

            setIsUpdating(false)

    } 

    return { isUpdating, isFollowing, followOrUnfollowUser }

}

export default useFollowUser
