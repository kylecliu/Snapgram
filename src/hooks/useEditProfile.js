import { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, firestore } from '../firebase/firebase';
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from '../store/ProfileStore';



const useEditProfile = () => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)  
    const setAuthUser = useAuthStore(state => state.setUser)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)


    const editProfile = async(inputs, selectedFile) => {

        if(isUpdating || !authUser) {
            //prevent repeated quick clicks
            return
        }

        setIsUpdating(true);
        
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

        const newUserDoc = {
            ...authUser, 
            username: inputs.username || authUser.username,
            fullName: inputs.fullName || authUser.fullName,
            bio: inputs.bio || authUser.bio,
            profileURL: URL || authUser.profileURL
        }

        const userDocRef = doc(firestore, "users", authUser.uid);

        await updateDoc(userDocRef, newUserDoc);

        localStorage.setItem('user-info', JSON.stringify(newUserDoc))
        setAuthUser(newUserDoc)
        setUserProfile(newUserDoc)
        toast('Success', "Profile updated successfullly", "success")

    }

    return {isUpdating, editProfile}
}

export default useEditProfile
