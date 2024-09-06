import { useState, useEffect } from 'react'
import useDisplayToast from './useDisplayToast'
import useUserProfileStore from '../store/ProfileStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/AuthStore'

const useGetFollowers = () => {

    const [followers, setFollowers] = useState([])
    const [followedUsers, setFollowedUsers] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const {userProfile} = useUserProfileStore()
    const toast = useDisplayToast()

    const getFollowers = async() => {

        if(!authUser || isFetching || userProfile?.followers.length === 0) return setFollowers([])

        setIsFetching(true)

        try {

            const q = query(collection(firestore, "users"), where("uid", "in", userProfile?.followers))

            const querySnapshot = await getDocs(q)

            const docs = []

            querySnapshot.forEach((doc) =>
                
                docs.push(doc.data())
            )


            setFollowers(docs)

            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetching(false)

        }

        return followers

    }
    

    const getFollowedUsers = async() => {

        if(!authUser || isFetching || userProfile?.following.length === 0) return setFollowedUsers([])


        setIsFetching(true)

        try {

            const q = query(collection(firestore, "users"), where("uid", "in", userProfile?.following))

            const querySnapshot = await getDocs(q)

            const docs = []

            querySnapshot.forEach((doc) =>
                
                docs.push(doc.data())
            )

            setFollowedUsers(docs)

            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetching(false)

        }

        return followedUsers

    }

    useEffect(() => {

        getFollowers()
        getFollowedUsers()

    }, [userProfile])

    return { isFetching, followers, followedUsers}


}

export default useGetFollowers
