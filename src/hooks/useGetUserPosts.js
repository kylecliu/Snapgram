import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useDisplayToast from './useDisplayToast'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/ProfileStore';

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
            setPosts([])
            console.log("Posts intial")
            console.log(posts)
    
            try{
    
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
                const querySnapshot = await getDocs(q)
    
                const docs = []
    
                querySnapshot.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
                console.log(docs)
                docs.sort((a, b) => a.createdAt - b.createdAt )
                setPosts(docs)
                console.log("UseGetUserPosts")
                console.log(posts)
    
    
            } catch(error) {
                toast("Error", error.message, "error")
                setPosts([])
    
            } finally {
                setIsFetching(false)
                console.log("final")
                console.log(posts)
            }
    
        }
    
        getPosts()

    }, [userProfile, setPosts])

    return {isFetching, posts}
}

export default useGetUserPosts
