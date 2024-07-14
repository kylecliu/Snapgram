import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import useDisplayToast from './useDisplayToast'
import useAuthStore from '../store/AuthStore'



const useLogout = () => {

    const [signOut, loading, error] = useSignOut(auth);

    const userLogout = useAuthStore((state) => state.logout);

    const toast = useDisplayToast();

    const logOutHandler = async() => {

        try {

            await signOut();
            localStorage.removeItem('user-info');
            userLogout();

        } catch(error) {

            toast('Error', error.message, 'error')
        }
    }

  return { logOutHandler, loading, error }
}

export default useLogout
