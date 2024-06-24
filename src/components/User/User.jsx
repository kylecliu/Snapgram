import React, { useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Heading, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const User = ( {img, username} ) => {

  const [isFollowing, setIsFollowing] = useState(false);



  return (
    <Flex py={3} w={'280px'}>
        <Avatar name='user' size='md' src={img} mr={3} ></Avatar>
        <Flex direction={'column'} flex={1} >
            <Link 
            as={RouterLink} 
            to={'/index'} 
            fontWeight={'bold'}
            style={{textDecoration: 'none'}}
            >
              {username}</Link>
            <Text color={'gray'} fontSize={'11px'}>Sueggested for you</Text>
        </Flex>

        <Flex 
        onClick={() => {setIsFollowing(!isFollowing)}} 
        cursor={'pointer'} 
        color={'#0095F6'} 
        fontWeight={'bold'} 
        align={'center'} 
        fontSize={'13px'} 
        _hover={{color: '#393e46'}} >
          {isFollowing ? 'Unfollow' : 'Follow'}</Flex>
    </Flex>
  )
}

export default User
