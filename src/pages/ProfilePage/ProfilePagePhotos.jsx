import { Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserPosts from '../../hooks/useGetUserPosts'
import ProfilePhoto from './ProfilePhoto'


const ProfilePagePhotos = () => {

  const { isFetching, posts } = useGetUserPosts()

  const noPostsFound = !isFetching && posts && posts.length === 0
  if(noPostsFound) return <NoPostsFound />

  return (
    <>

    {isFetching ? (<Grid w={{base: '100%', sm: '70%'}} gap={{base: 1, sm:2}} templateColumns={'repeat(3, 1fr)'} >

    {[...Array(12)].map((element, idx) => <GridItem key={idx}><Skeleton h={'full'} w={'full'} aspectRatio={1/1}>text</Skeleton></GridItem>)}

    </Grid>) : ( <Grid w={{base: '100%', sm: '70%'}} maxW={'800px'} style={{ gridTemplateColumns:'repeat(3, 1fr)'}} gap={{base: 0.5, sm: 1}} my={2} mb={{base: '50px'}}>
        
        {posts && posts.map((post) => <ProfilePhoto key={post.id} post={post}></ProfilePhoto> )} 

    </Grid>)}

    </>
  )
}

export default ProfilePagePhotos

const NoPostsFound = () => {

  return (
      <Flex  w={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'2xl'} m={20}>
          This account does not yet have posts!
        </Text>
      </Flex>
  )

}
