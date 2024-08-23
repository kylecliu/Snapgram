import { useState } from 'react'
import useDisplayToast from './useDisplayToast'
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";



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
        toast("Error", "No Such User Found", "error")
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
