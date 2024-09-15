import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from 'react';
import { firestore } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';


const useSearchUser = () => {

const [isFetching, setIsFetching] = useState(false)
const [user, setUser] = useState(null)
const toast = useDisplayToast();

const searchUser = async(username) => {

    setIsFetching(true)

   try {

    const userRef = collection(firestore, "users")
    const q = query(userRef, where("username", "==", username))

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        
        toast("Info", "No such user found, try another one 🔎", "info")
        return

    } else {

        querySnapshot.forEach((doc) => {
        setUser(doc.data())

    });

    }

   } catch(error) {

    toast("Error", error.message, "error")

   } finally {

    setIsFetching(false)

   }

}

return { isFetching, user, searchUser, setUser }


}

export default useSearchUser
