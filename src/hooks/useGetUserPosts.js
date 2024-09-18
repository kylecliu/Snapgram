import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/ProfileStore';
import useDisplayToast from './useDisplayToast';


const useGetUserPosts = () => {

    const [isFetching, setIsFetching] = useState(false)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const posts = usePostStore(state => state.posts)
    const setPosts = usePostStore(state => state.setPosts)
    const toast = useDisplayToast()


    
    useEffect(() => {

        const getPosts = async() => {

            if(!userProfile) return 
    
            setIsFetching(true)
            setPosts(null)

            try{
    
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q)
    
                const docs = []
    
                querySnapshot.forEach((doc) => {

                    docs.push({...doc.data(), id: doc.id})
                    
                })
                
                //Sort by timestamp
                docs.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(docs)


            } catch(error) {

                toast("Error", error.message, "error")
    
            } finally {

                setIsFetching(false)

            }
    
        }
    
        getPosts()


    }, [userProfile?.uid])

    return {isFetching, posts}
}

export default useGetUserPosts
