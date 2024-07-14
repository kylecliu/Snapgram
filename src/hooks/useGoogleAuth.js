import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';
import useAuthStore from '../store/AuthStore';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';

const useGoogleSignIn = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    
    const toast = useDisplayToast();

    const userLogIn = useAuthStore(state => state.login);

    const googleSignIn = async() => {

        try {

            await signInWithGoogle();

            if(user) {

                const docRef = doc(firestore, "users", user.user.uid);
                const docSnap = await getDoc(docRef);

                console.log(docSnap)

                //If user doesn't exist in database, create a user info entry

                if (!docSnap.exists()) {

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

                } 

                //Store user info in local storage and upadate user status in store

                localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
                userLogIn(docSnap.data());
                
            }

        } catch(error) {

            toast('Error', error.message, 'error')

        }

    }

    return { googleSignIn, loading, error};

}

export default useGoogleSignIn