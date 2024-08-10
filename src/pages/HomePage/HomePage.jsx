import React, { useState } from 'react'
import Post from '../../components/Post/Post'
import Users from '../../components/User/Users'
import { Flex, Container, Box, Text, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useAuthStore from '../../store/AuthStore'
import useFetchPostsHomepage from '../../hooks/useFetchPostsHomepage'



const HomePage = () => {

  const authUser = useAuthStore(state => state.user);
  const {isFetching, postsToDisplay} = useFetchPostsHomepage()

  console.log(postsToDisplay)

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
          {/* <Post username='anna' avatar='img1.png' photo='img1.png'   location='Paris'  />
          <Post username='steve' avatar='img2.png' photo='img2.png' location='London'  />
          <Post username='yako' avatar='img3.png' photo='img3.png'   location='Tokyo'  />
          <Post username='bran' avatar='img4.png' photo='img4.png' location='Seoul'  /> */}
          {postsToDisplay.map((post) => <Post post={post} isFetching={isFetching}/>)}
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
