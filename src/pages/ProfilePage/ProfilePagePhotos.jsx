import { Grid, GridItem, Skeleton, Flex, Text } from '@chakra-ui/react'
import {Link as RouterLink, useParams} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import ProfilePhoto from './ProfilePhoto'
import useAuthStore from '../../store/AuthStore'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import useGetUserPosts from '../../hooks/useGetUserPosts'
import usePostStore from '../../store/postStore'
import useDisplayToast from '../../hooks/useDisplayToast'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../../firebase/firebase'



const ProfilePagePhotos = () => {

  const { username } = useParams();
  console.log("username")
  console.log(username)
  const { userProfile, isLoading } = useGetUserProfile(username);
  console.log("userProfile")
  console.log(userProfile)
  const { isFetching, posts } = useGetUserPosts()

 

//     const [isFetching, setIsFetching] = useState(false)
//     const posts = usePostStore(state => state.posts)
//     const setPosts = usePostStore(state => state.setPosts)
//     const toast = useDisplayToast()

//   useEffect(() => {

//     const getPosts = async() => {

//         if(!userProfile) return

//         setIsFetching(true)
//         setPosts([])
//         console.log("Posts intial")
//         console.log(posts)

//         try{

//             const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
//             const querySnapshot = await getDocs(q)

//             const docs = []

//             querySnapshot.forEach((doc) => docs.push({...doc.data(), id: doc.id}))
//             console.log(docs)
//             setPosts(docs)
//             console.log("UseGetUserPosts")
//             console.log(posts)


//         } catch(error) {
//             toast("Error", error.message, "error")
//             setPosts([])

//         } finally {
//             setIsFetching(false)
//             console.log("final")
//             console.log(posts)
//         }

//     }

//     getPosts()

// }, [userProfile, setPosts])





  const noPostsFound = !isFetching && posts.length == 0
  if(noPostsFound) return <NoPostsFound />


  console.log("Look here")
  console.log(userProfile)
  console.log(posts)
  

  return (
    <>

    {isLoading ? (<Grid w={'70%'} gap={2} templateColumns={'repeat(3, 1fr)'} >
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>

    </Grid>) : ( <Grid w={'70%'} style={{ gridTemplateColumns:'repeat(3, 1fr)'}} gap={1} my={2}>
        
        {  posts.map((post) => <ProfilePhoto key={post.id} post={post} userProfile={userProfile}></ProfilePhoto> )} 

    </Grid>)}

    </>
  )
}

export default ProfilePagePhotos

const NoPostsFound = () => {

  return (
      <Flex  w={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'3xl'} my={20}>
          This account does not yet have posts!
        </Text>
      </Flex>
  )

}
