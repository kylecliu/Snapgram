import { Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Post from '../../components/Post/Post'
import Users from '../../components/User/Users'
import useFetchPostsHomepage from '../../hooks/useFetchPostsHomepage'
import useAuthStore from '../../store/AuthStore'


const HomePage = () => {

  const authUser = useAuthStore(state => state.user)
  const {isFetching, postsToDisplay} = useFetchPostsHomepage()

  return (

    <Flex >
      {/* middle display area */}

      {/* displays when user doesn't follow anyone */}
      {!isFetching && authUser.following.length === 0 && 
      <Flex  direction={'column'} w={{base: '100%' ,lg: '70%'}} align={'center'} px={{base: 0, sm: 10}}>
        <Text fontSize={{ base: 'xl' ,md:'3xl'}} my={20}> 
          You are not following anyone. <br/> Check out our suggested users 😎! 
        </Text>
        <Container p={5} display={{base:'block', lg: 'none'}}>
          <Flex direction={'column'} w={'100%'}>
            <Users />
          </Flex>
        </Container>
      </Flex>}

       {/* displays when user follows some users but there are no posts to show */}
      {!isFetching && authUser.following.length !== 0 && postsToDisplay.length === 0 ? 
      <Flex  direction={'column'} w={{base: '100%' ,lg: '70%'}} align={'center'} px={{base: 0, sm: 10}}>
        <Text fontSize={{ base: 'xl' ,md:'3xl'}} my={20}> 
          There are no posts to show! <br/> Be the first to post something 😄!
        </Text>
        <Container p={5} display={{base:'block', lg: 'none'}}>
          <Flex direction={'column'} w={'100%'}>
            <Users />
          </Flex>
        </Container>
      </Flex> : null}

        {/* displays posts */}
        {!isFetching && authUser.following.length !== 0 && postsToDisplay.length > 0 ? <Flex flex='4.5' direction={'column'} align={'center'}>
          {postsToDisplay.map((post, idx) => <Post key={idx} post={post}/>)}
        </Flex> : null}
      
      {/* Right-side pane */}
      { !isFetching && <Flex flex='2' p={10} display={{base:'none', lg: 'block'}}>
        <Flex direction={'column'} w={'100%'}>
          <Users />
        </Flex>
      </Flex>}
        
    </Flex>
  )
}

export default HomePage
