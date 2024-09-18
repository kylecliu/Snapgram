import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/AuthStore';
import usePostStore from '../store/postStore';
import useDisplayToast from './useDisplayToast';


const useFetchPostsHomepage = () => {

    const [isFetching, setIsFetching] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const {posts: postsToDisplay, setPosts: setPostsToDisplay}= usePostStore()
    const toast = useDisplayToast()

    const fetchPosts = async() => {

        if(isFetching) return
        setIsFetching(true)

        try {

            const following = authUser.following
            
            //Display posts from users followed by Authuser as well as their own posts
            const q = query(collection(firestore, "posts"), where("createdBy", "in", [...following, authUser.uid]));

            const querySnapshot = await getDocs(q);

            let posts = []
            
            querySnapshot.forEach((doc) => {

                posts.push({...doc.data(), id: doc.id})
            
            });

            //Sort by timestamp
            posts.sort((a, b) => b.createdAt - a.createdAt)

            setPostsToDisplay(posts)
            
            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetching(false)

        }

    }

    useEffect(() => {

        fetchPosts()

    }, [authUser, postsToDisplay.length])//postsToDisplay.length is for when a post is added or deleted


    return { isFetching, postsToDisplay }
}

export default useFetchPostsHomepage
