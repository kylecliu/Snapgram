import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const Profile = ({img, username}) => {
  return (
    <Flex py={3} w={'280px'}>
        <Avatar name='user' size='md' src={img} mr={3} ></Avatar>
        <Flex direction={'column'} flex={1} mr={'70px'}>
            <Link 
            as={RouterLink} 
            to={'/index'} 
            fontWeight={'bold'}
            style={{textDecoration: 'none'}}
            >{username}</Link>
            <Text color={'gray'} fontSize={'11px'}>Dream on</Text>
        </Flex>
        <Flex onClick={() => {window.alert('Logged out')}} cursor={'pointer'} color={'#0095F6'} fontWeight={'bold'} align={'center'} fontSize={'13px'} _hover={{color: '#393e46'}} >Log out</Flex>
    </Flex>
  )
}

export default Profile
