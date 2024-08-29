import { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, firestore } from '../firebase/firebase';
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import useUserProfileStore from '../store/ProfileStore';
import { useNavigate } from "react-router-dom";




const useEditProfile = () => {

    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)  
    const setAuthUser = useAuthStore(state => state.setUser)
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)
    const navigate = useNavigate()


    const editProfile = async(inputs, selectedFile) => {

        if(isUpdating || !authUser) {
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

        //Prevent repeated usernames

        const q = query(collection(firestore, "users"), where("username", "==", inputs.username));

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {

            toast("Error", "This username is taken", "error")
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

        console.log(`new UserDoc: ${newUserDoc}`)


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
