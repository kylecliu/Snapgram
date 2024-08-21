import { Grid, GridItem, Skeleton, Flex, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import useGetUserPosts from '../../hooks/useGetUserPosts'




const ProfilePagePhotos = () => {

  const { username } = useParams();
  const { userProfile, isLoading } = useGetUserProfile(username);
  const { isFetching, posts } = useGetUserPosts()


  const noPostsFound = !isFetching && posts.length === 0
  if(noPostsFound) return <NoPostsFound />

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
        
        {posts.map((post) => <ProfilePhoto key={post.id} post={post}></ProfilePhoto> )} 

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
