import React from 'react'
import { auth } from '../firebase/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firestore } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';
import useAuthStore from '../store/AuthStore';
import { collection, query, where, getDocs } from "firebase/firestore";


const useSignUpWithEmailAndPassword = () => {

  const loginUser = useAuthStore((state) => state.login);

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const toast = useDisplayToast();



  const signup = async (inputs) => {

    if(!(inputs.email && inputs.password && inputs.fullName && inputs.username )) {

      toast("Error", error.message, 'error')
      return }

      // Checking if username is already taken

        const q = query(collection(firestore, "users"), where("username", "==", inputs.username));

        try {const result = await getDocs(q);

          // if(!(result.length === 0)) {

          //   toast("length > 0", typeofresult , "success")
            
          // }

          if(!result.empty) {

            toast("Error", "Username is not available", 'error')

            return
          } 

        } catch(e) {
          toast("Error", error.message, 'error')
        }

      try {

        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

        if(!newUser && error) {

          toast("Error", error.message, 'error')

          return
          
        } if(newUser) {

          const userDoc = {
            uid: newUser.user.uid,
            email: inputs.email,
            username: inputs.username,
            fullName: inputs.fullName,
            bio: "",
            profileURL: "",
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now()
          }

          await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);


          localStorage.setItem("user-info", JSON.stringify(userDoc))

          loginUser(userDoc);

        }

      } catch(error) {

        toast("Error", error.message, 'error')
      }
    
  }

  return {user, loading, signup}
}

export default useSignUpWithEmailAndPassword

