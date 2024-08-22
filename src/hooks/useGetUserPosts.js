import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import usePostStore from '../store/postStore'
import useDisplayToast from './useDisplayToast'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/ProfileStore';
import useGetUserProfile from './useGetUserProfile';


const useGetUserPosts = () => {

    const [isFetching, setIsFetching] = useState(false)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const posts = usePostStore(state => state.posts)
    const setPosts = usePostStore(state => state.setPosts)
    const toast = useDisplayToast()


    
    useEffect(() => {

        const getPosts = async() => {

            if(!userProfile) return setIsFetching(false)
    
            setIsFetching(true)
            setPosts([])

    
            try{
    
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q)
    
                const docs = []
    
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                    
                })
                
                docs.sort((a, b) => b.createdAt - a.createdAt )
                setPosts(docs)

                
            } catch(error) {

                toast("Error", error.message, "error")
    
            } finally {

                setIsFetching(false)

            }
    
        }
    
        getPosts()

        console.log("useEffect sucks")
        console.log(userProfile)

    }, [userProfile?.uid])

    return {isFetching, posts}
}

export default useGetUserPosts
