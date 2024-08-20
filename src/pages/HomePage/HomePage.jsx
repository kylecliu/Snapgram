import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import Users from '../../components/User/Users'
import { Flex, Container, Box, Text, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useAuthStore from '../../store/AuthStore'
import useFetchPostsHomepage from '../../hooks/useFetchPostsHomepage'
import useGetComments from '../../hooks/useGetComments'



const HomePage = () => {

  const authUser = useAuthStore(state => state.user);
  const {isFetching, postsToDisplay} = useFetchPostsHomepage()
  // const {comments, isFetchingComments} = useGetComments(postIds)


  return (

    <Flex width='100' justify={'center'} gap={{ md:'20'}}>
      {/* middle display area */}

      {!isFetching && postsToDisplay.length === 0 && 
      <Flex  w={'70%'} justify={'center'} ml={10}>
        <Text fontSize={{ base: 'xl' ,md:'3xl'}} my={20}> 
          You are not following anyone. <br /> Check out our suggested users 😎! 
        </Text>
      </Flex>}


      <Box flex='3'  minH='100vh'>
        <Flex direction={'column'} align={'center'}>
          {!isFetching && postsToDisplay.map((post, idx) => <Post key={idx} post={post}/>)}
        </Flex>
      </Box> 

      
      {/* Right-side pane */}
      <Container flex='2' p={5} display={{base: 'none', md: 'none', lg: 'block'}}>
        <Users />
        <Box textAlign={'center'} w={280}>
          <Text color='gray' fontSize='12px'>{new Date().getFullYear()} © Built by Kyle </Text>
        </Box>
      </Container>
        

    </Flex>
  )
}

export default HomePage
