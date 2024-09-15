import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { firestore, storage } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useUserProfileStore from '../store/ProfileStore';
import useDisplayToast from './useDisplayToast';


const useEditProfile = () => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)  
    const setAuthUser = useAuthStore(state => state.setUser)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)
    const navigate = useNavigate()


    const editProfile = async(inputs, selectedFile) => {

        if(!authUser) return toast("Info", "Please log in to proceed", "info")

        if(isUpdating) {
            //prevent repeated quick clicks
            return
        }

        setIsUpdating(true);

        try {

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);

        let URL = '';

        if(selectedFile) {

            try{

                await uploadString(storageRef, selectedFile, 'data_url');
                URL = await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))

            } catch(error) {

                toast("Error", error.message, "error")
            }

        }


        const userDocRef = doc(firestore, "users", authUser.uid);

        //Performs a check to ensure unique usernames

        const q = query(collection(firestore, "users"), where("username", "==", inputs.username));

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {

            toast("Error", "This username is taken. Please choose another one.", "error")
            return
        }

        const newUserDoc = {
            ...authUser, 
            username: inputs.username || authUser.username,
            fullName: inputs.fullName || authUser.fullName,
            bio: inputs.bio || authUser.bio,
            profileURL: URL || authUser.profileURL
        }

        await updateDoc(userDocRef, {
            username: inputs.username || authUser.username,
            fullName: inputs.fullName || authUser.fullName,
            bio: inputs.bio || authUser.bio,
            profileURL: URL || authUser.profileURL
        });

       //Updates the authUser and userProfile stores
        setAuthUser(newUserDoc)
        setUserProfile(newUserDoc)

        navigate(`/${inputs.username}`)
        toast('Success', "Profile updated successfullly", "success")

        
        } catch (error) {

            toast("Error", error.message, "error")

        } finally {

            setIsUpdating(false)

        }


    }

    return {isUpdating, editProfile}
}

export default useEditProfile
