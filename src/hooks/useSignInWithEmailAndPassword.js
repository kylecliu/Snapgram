import React from 'react'
import { auth } from '../firebase/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firestore } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';

const useSignInWithEmailAndPassword = () => {

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

        }

      } catch(error) {
        
        toast("Error", error.message, 'error')
      }
    
  }

  return {user, loading, signup}
}

export default useSignInWithEmailAndPassword

