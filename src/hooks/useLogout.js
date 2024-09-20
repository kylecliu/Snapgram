import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import useAuthStore from '../store/AuthStore'
import useDisplayToast from './useDisplayToast'
import { useNavigate } from 'react-router-dom'



const useLogout = () => {

    const [signOut, loading, error] = useSignOut(auth);
    const userLogout = useAuthStore((state) => state.logout);
    const toast = useDisplayToast();
    const navigate = useNavigate()

    const logOutHandler = async() => {

        try {

            await signOut();
            userLogout();
            navigate('/')

        } catch(error) {

            toast('Error', error.message, 'error')
        }
    }

  return { logOutHandler, loading, error }
}

export default useLogout
