import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';

const useSuggestedUsers = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [suggestedUser, setSuggestedUser] = useState([])
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)

    const fetchSuggestedUsers = async() => {

        setIsLoading(true)

        try {

            const userRef = collection(firestore, "users");
            const q = query(userRef, where("uid", "not-in", [...authUser.following, authUser.uid]), orderBy('uid'), limit(10))

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
