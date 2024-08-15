import { useEffect, useState } from 'react'
import useDisplayToast from './useDisplayToast'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserProfilebyId = (uid) => {

    const [isFetchingProfile, setIsFetchingProfile] = useState(false)
    const [userProfile, setUserProfile] = useState({})
    const toast = useDisplayToast()
    const getUserProfileById = async() => {

        setIsFetchingProfile(true)

        try {

            const docRef = doc(firestore, "users", uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {

                setUserProfile(docSnap.data())

            } else {

                toast("Error", "No user found with this ID", "error")
            }
        
            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetchingProfile(false)
        }

    }

    useEffect(() => {

        getUserProfileById(uid)

    },[])


    return { isFetchingProfile, userProfile }

}

export default useGetUserProfilebyId
