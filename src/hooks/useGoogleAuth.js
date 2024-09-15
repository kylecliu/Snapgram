import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';

const useGoogleSignIn = () => {

    const [signInWithGoogle, loading, ,error] = useSignInWithGoogle(auth);
    const toast = useDisplayToast();
    const userLogIn = useAuthStore(state => state.login);

    const googleSignIn = async() => {

        try {

            const user = await signInWithGoogle();

            if(error && !loading) {

                return toast("Error", error.message, "error")

            } 

            if(!user && !loading) {

                return toast("Error", "Something went wrong! Please try again later", "error")
            }

            if(user && !loading) {

                const docRef = doc(firestore, "users", user.user.uid);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {

                    //If user doesn't exist in database, create a user info entry
                    const userDoc = {
                        uid: user.user.uid,
                        email: user.user.email,
                        username: user.user.email.split('@')[0],
                        fullName: user.user.displayName,
                        bio: "",
                        profileURL: user.user.photoURL,
                        followers: [],
                        following: [],
                        posts: [],
                        createdAt: Date.now()
                    }

                    await setDoc(doc(firebase, "users", user.user.uid), userDoc);
                    //update userStore to userDoc
                    userLogIn(userDoc)
                    
                } else {

                    //if user exixsts, update userStore to data from database
                    userLogIn(docSnap.data());

                }

            }

        } catch(error) {

            toast('Error', error.message, 'error')

        }

    }

    return { googleSignIn, error };

}

export default useGoogleSignIn