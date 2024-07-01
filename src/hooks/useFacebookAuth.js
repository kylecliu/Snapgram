import { useSignInWithFacebook } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';
import useAuthStore from '../store/AuthStore';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';

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

                console.log(docSnap)

                if (docSnap.exists()) {
                
                    localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
                    userLogIn(docSnap.data());

                } else {

                    toast('Error', 'You do not have an account with us!', 'error')
                }

            } else {
                
            }

        } catch(error) {

            toast('Error', error.message, 'error')

        }

    }

    return { facebookSignIn, loading, error};

}

export default useFacebookSignIn