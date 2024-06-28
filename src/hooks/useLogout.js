import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import useDisplayToast from './useDisplayToast'


const useLogout = () => {

    const [signOut, loading, error] = useSignOut(auth);

    const toast = useDisplayToast();

    const logOutHandler = async() => {

        try {

            await signOut();
            localStorage.removeItem('user-info');

        } catch(error) {

            toast('Error', error.message, 'error')
        }
    }

  return { logOutHandler, loading, error }
}

export default useLogout
