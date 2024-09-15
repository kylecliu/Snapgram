import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/ProfileStore';
import useDisplayToast from './useDisplayToast';


    const useGetUserProfile = (username) => {

    const [isLoading, setIsLoading] = useState(true);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const toast = useDisplayToast();

    useEffect(() => {

        const getUserProfile = async() => {

            try {

                const q = query(collection(firestore, "users"), where("username", "==", username)); 
                const querySnapshot = await getDocs(q);

                if(querySnapshot.empty) {

                   return  setUserProfile(null);

                } else {

                   let userDoc;

                    querySnapshot.docs.forEach((doc) => userDoc = doc.data());

                    setUserProfile(userDoc);

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
