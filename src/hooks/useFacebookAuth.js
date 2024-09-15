import { doc, getDoc } from "firebase/firestore";
import { useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';

const useFacebookSignIn = () => {

    const [signInWithFacebook, user, loading, error] = useSignInWithFacebook(auth);
    
    const toast = useDisplayToast();

    const userLogIn = useAuthStore(state => state.login);

    const facebookSignIn = async() => {

        try {

            await signInWithFacebook();

            if(user) {

                const docRef = doc(firestore, "users", user.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                
                    userLogIn(docSnap.data());

                } else {

                    toast('Error', 'You do not have an account with us!', 'error')
                }

            } else {

                toast('Error', 'Something went wrong. Please try again later', 'error')
                
            }

        } catch(error) {

            toast('Error', error.message, 'error')

        }

    }

    return { facebookSignIn, loading, error};

}

export default useFacebookSignIn