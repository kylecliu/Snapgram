import { useEffect, useState } from 'react'
import useAuthStore from '../store/AuthStore'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useDisplayToast from './useDisplayToast';


const useFetchPostsHomepage = () => {

    const [isFetching, setIsFetching] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const [postsToDisplay, setPostsToDisplay] = useState([])
    const toast = useDisplayToast()
    const fetchPosts = async() => {

        if(isFetching) return
        setIsFetching(true)

        try {

            const following = authUser.following
            const q = query(collection(firestore, "posts"), where("createdBy", "in", [...following, authUser.uid]));//Display posts from users followed by Authuser as well as their own posts

            const querySnapshot = await getDocs(q);

            let posts = []
            
            querySnapshot.forEach((doc) => {
                posts.push({...doc.data(), id: doc.id})
            });

            posts.sort((a, b) => b.createdAt - a.createdAt)

            console.log("posts")
            console.log(posts)

            setPostsToDisplay(posts)
            
        } catch (error) {

            toast("Error", error.message, "error")
            
        } finally {

            setIsFetching(false)
            console.log(postsToDisplay)
        }

    }

    useEffect(() => {



            fetchPosts()
        

    }, [authUser])


    return { isFetching, postsToDisplay }
}

export default useFetchPostsHomepage
