import { Avatar, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useDisplayToast from '../../hooks/useDisplayToast';
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/AuthStore';


const Profile = () => {

  const { logOutHandler, loading, error } = useLogout();

  const user = useAuthStore(state => state.user);

  const toast = useDisplayToast();

  return (
    <Flex py={3} justify={'space-between'}>
        <Flex>
          <Link as={RouterLink} to={`${user.username}`}><Avatar name={user.fullName} size='md' src={user.profileURL} mr={3}></Avatar></Link>
          <Flex direction={'column'} >
              <Link 
              as={RouterLink} 
              to={`${user.username}`} 
              fontWeight={'bold'}
              style={{textDecoration: 'none'}}
              >{user.username}</Link>
              <Text color={'gray'} fontSize={'11px'}>{user.fullName}</Text>
          </Flex>
        </Flex>
        {error && toast("Error", error.message, 'error')}
        <Flex align={'center'} px={2}>
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
