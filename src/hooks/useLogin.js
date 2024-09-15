import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';


const useLogin = () => {

    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const toast = useDisplayToast();
    const userLogIn = useAuthStore(state => state.login);
    const logIn = async(inputs) => {

        if(!(inputs.email && inputs.password)) {

            return toast("Error", 'Please fill all fields', 'error')
        }

        try {

            const userCreds = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCreds) {

                const docRef = doc(firestore, "users", userCreds.user.uid);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists) {
                
                    userLogIn(docSnap.data());

                } else {

                    toast("Error", "No such user found", 'error')

                }

            }
    
        } catch(error) {
    
            return toast("Error", error.message, 'error')

        } 

}

return {logIn, loading, error}

}

export default useLogin

