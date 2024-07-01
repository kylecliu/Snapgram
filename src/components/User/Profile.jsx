import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useDisplayToast from '../../hooks/useDisplayToast';
import useAuthStore from '../../store/AuthStore';


const Profile = () => {

  const { logOutHandler, loading, error } = useLogout();

  const user = useAuthStore(state => state.user);

  const toast = useDisplayToast();

  return (
    <Flex py={3} w={'280px'}>
        <Link as={RouterLink} to={`${user.username}`}><Avatar name={user.fullName} size='md' src={user.profileURL} mr={3}></Avatar></Link>
        <Flex direction={'column'} flex={1} mr={'70px'}>
            <Link 
            as={RouterLink} 
            to={'/'} 
            fontWeight={'bold'}
            style={{textDecoration: 'none'}}
            >{user.username}</Link>
            <Text color={'gray'} fontSize={'11px'}>{user.fullName}</Text>
        </Flex>
        {error && toast("Error", error.message, 'error')}
        <Flex align={'center'}  >
          <Button 
          size={'xs'}
          variant={'ghost'}
          px={0}
          onClick={logOutHandler} 
          color={'#0095F6'} 
          fontWeight={'bold'} 
          fontSize={'13px'} 
          isLoading={loading}
          _hover={{color: '#393e46'}}>Log out</Button>
          </Flex>

    </Flex>
  )
}

export default Profile
