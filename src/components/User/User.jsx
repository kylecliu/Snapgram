import { Avatar, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useFollowUser from '../../hooks/useFollowUser';
import useAuthStore from '../../store/AuthStore';

const User = ({user, setUser, onClose}) => {

  const { isFollowing, isUpdating, followOrUnfollowUser } = useFollowUser(user.uid)
  const authUser = useAuthStore(state => state.user)
  const isSameUser = authUser?.uid === user.uid
  const followHandler = () => {

    setUser(isFollowing ? {...user, followers: user.followers.filter((uid) => uid !== authUser.uid)} : {...user, followers: [...user.followers, authUser.uid]})
    
    followOrUnfollowUser()

  }
  

  return (
    <Flex py={3}  w={'100%'}>
      <Link 
      as={RouterLink}      
      to={`/${user.username}`}
      onClick={onClose}>
        <Avatar name={user.username} size='md' src={user.profileURL} mr={3} ></Avatar>
      </Link>
      <Flex w={"100%"} justify={'space-between'} >
        <Flex direction={'column'} flex={1} >
            <Link 
            as={RouterLink} 
            to={`/${user.username}`} 
            fontWeight={'bold'}
            style={{textDecoration: 'none'}}
            onClick={onClose}
            >
              {user.username}</Link>
            <Text color={'gray'} fontSize={'11px'}> {user.followers.length} followers</Text>
        </Flex>

        <Flex h={'100%'} align={'center'} >

            {isSameUser ? null :           <Button 
              variant={'ghost'} 
              fontSize={'13px'}  
              color={'#0095F6'} 
              size={'xs'} 
              isLoading={isUpdating}
              onClick={followHandler}
              >
            {isFollowing ? 'Unfollow' : 'Follow'}</Button>}

          </Flex>
        </Flex>
          
    </Flex>
  )
}

export default User
