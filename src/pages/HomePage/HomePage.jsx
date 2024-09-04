import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Post from '../../components/Post/Post'
import Users from '../../components/User/Users'
import useFetchPostsHomepage from '../../hooks/useFetchPostsHomepage'



const HomePage = () => {

  const {isFetching, postsToDisplay} = useFetchPostsHomepage()


  return (

    <Flex >
      {/* middle display area */}

      {!isFetching && postsToDisplay.length === 0 && 
      <Flex  w={'70%'} justify={'center'} ml={10}>
        <Text fontSize={{ base: 'xl' ,md:'3xl'}} my={20}> 
          You are not following anyone. <br /> Check out our suggested users 😎! 
        </Text>
      </Flex>}

        <Flex flex='4.5' direction={'column'} align={'center'}>
          {!isFetching && postsToDisplay.map((post, idx) => <Post key={idx} post={post}/>)}
        </Flex>
      
      {/* Right-side pane */}
      <Container flex='2' p={5} display={{base:'none', lg: 'block'}}>
        <Flex direction={'column'} w={'80%'}>
          <Users />
        </Flex>
      </Container>
        
    </Flex>
  )
}

export default HomePage
