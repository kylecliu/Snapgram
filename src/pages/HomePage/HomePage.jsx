import React, { useState } from 'react'
import Post from '../../components/Post/Post'
import Users from '../../components/User/Users'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack } from '@chakra-ui/react'
import useAuthStore from '../../store/AuthStore'



const HomePage = () => {

  const user = useAuthStore(state => state.user);

  return (

    <Flex width='100' justify={'center'} gap={20}>
          {console.log(user)}
      {/* middle display area */}
      <Box flex='3'  minH='100vh'>
        <Flex direction={'column'} align={'center'}>
          <Post username='anna' avatar='img1.png' photo='img1.png'   location='Paris'  />
          <Post username='steve' avatar='img2.png' photo='img2.png' location='London'  />
          <Post username='yako' avatar='img3.png' photo='img3.png'   location='Tokyo'  />
          <Post username='bran' avatar='img4.png' photo='img4.png' location='Seoul'  />
        </Flex>
      </Box>
      
      {/* Right-side pane */}
      <Container flex='2' p={5} display={{md: 'none', lg: 'block'}}>
      {/* <Text fontWeight={'bold'} color={'gray'}>Suggested for you</Text>
        <Flex direction={'column'} py={2}>
          
          <User />
          <User />
          <User />
          <User />

        </Flex> */}
        <Users />
        <Box textAlign={'center'} w={280}>
          <Text color='gray' fontSize='12px'>{new Date().getFullYear()} © Built by Kyle </Text>
        </Box>
      </Container>
      

    </Flex>
  )
}

export default HomePage
