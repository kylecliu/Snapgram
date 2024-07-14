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

            try {

                const q = query(collection(firestore, "users"), where("username", "==", username)); 
                const querySnapshot = await getDocs(q);

                console.log(username)

                console.log(querySnapshot);
                console.log(querySnapshot.empty)

                if(querySnapshot.empty) {

                    console.log('null')

                   return  setUserProfile(null);

                } else {

                   let userDoc;

                    querySnapshot.docs.forEach((doc) => {userDoc = doc.data()});

                    setUserProfile(userDoc);

                    console.log(userDoc);

                }


            } catch(error) {

                toast('Error', error.message, 'error');

            } finally {

                setIsLoading(false);
            }

        }
        
        getUserProfile();


    }, [username, setUserProfile])


  return { isLoading, userProfile }
}

export default useGetUserProfile
