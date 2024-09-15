import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import useDisplayToast from './useDisplayToast';


const useSignUpWithEmailAndPassword = () => {

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const toast = useDisplayToast();

  const signup = async (inputs) => {

    if(!(inputs.email && inputs.password && inputs.fullName && inputs.username )) {

      return toast("Error", "Please fill all fields", 'error')
      
       }

        // Checking if username is already taken
        const q = query(collection(firestore, "users"), where("username", "==", inputs.username));

        try {
          
          const querySnapshot = await getDocs(q);

          if(!querySnapshot.empty) {

            //username is taken in this instance
            toast("Error", "Username is not available", 'error')

            return
          } 

        } catch(error) {

          toast("Error", error.message, 'error')

        }

      try {

        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

        if(!loading && error) return toast("Error", error.message, 'error')
        if(!loading && !newUser) return toast("Error", "Something went wrong!", "error")

        if(newUser) {

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
          //update auth store user information
          loginUser(userDoc);

        }

      } catch(error) {

        toast("Error", error.message, 'error')
      }
    
  }

  return {error, loading, signup}
}

export default useSignUpWithEmailAndPassword

