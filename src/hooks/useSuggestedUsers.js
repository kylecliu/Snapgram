import React, { useEffect, useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { firestore } from '../firebase/firebase';

const useSuggestedUsers = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [suggestedUser, setSuggestedUser] = useState([])
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)

    const fetchSuggestedUsers = async() => {

        setIsLoading(true)

        try {

            const userRef = collection(firestore, "users");
            const q = query(userRef, where("uid", "not-in", [...authUser.following, authUser.uid]), orderBy('uid'), limit(3))

            const querySnapshot = await getDocs(q);
            let users = []
            querySnapshot.forEach((user) => users.push({...user.data(), id: user.id}))
            setSuggestedUser(users)


        } catch(error) {

            toast("Error", error.message, "error")

        } finally {

            setIsLoading(false)

        }

    }

    useEffect(() => {

        if(authUser) {
            fetchSuggestedUsers()
        }}

        , [authUser])

    
    return { isLoading, suggestedUser }

}

export default useSuggestedUsers
