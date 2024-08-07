import React, { useEffect, useState } from 'react'
import useUserProfileStore from '../store/ProfileStore'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';


    const useGetUserProfile = (username) => {

    const [isLoading, setIsLoading] = useState(true);

    const toast = useDisplayToast();

    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {

        const getUserProfile = async() => {

            console.log("getUserProfile starts here")

            try {

                const q = query(collection(firestore, "users"), where("username", "==", username)); 
                const querySnapshot = await getDocs(q);

                console.log("useGetUserProfile")
                console.log(username)
                console.log(querySnapshot);
                console.log(querySnapshot.empty)

                if(querySnapshot.empty) {

                    console.log('querySnapshot empty')

                   return  setUserProfile({});

                } else {

                   let userDoc;

                    querySnapshot.docs.forEach((doc) => userDoc = doc.data());

                    setUserProfile(userDoc);

                    console.log("userDoc")
                    console.log(userDoc);
                    console.log("userProfile")
                    console.log(userProfile)

                }


            } catch(error) {

                toast('Error', error.message, 'error');

            } finally {

                setIsLoading(false);
            }

        }
        
        getUserProfile();


    }, [username])


  return { isLoading, userProfile }
}

export default useGetUserProfile
