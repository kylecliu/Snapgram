import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import useSearchUser from '../../hooks/useSearchUser'
import useSuggestedUsers from '../../hooks/useSuggestedUsers'
import Profile from './Profile'
import User from './User'



const Users = () => {

  const { isLoading, suggestedUser } = useSuggestedUsers()
  const {isFetching, user, searchUser, setUser} = useSearchUser()


  return (
    !isLoading? <>

    <Profile  />
    {suggestedUser.length === 0 ? null : <Text fontWeight={'bold'} color={'gray'}>Suggested for you</Text>}
    
    <Flex direction={'column'} py={2}>

      {suggestedUser.map((user) => <User user={user} key={user.id} setUser={setUser}/>)}

    </Flex>
    <Box textAlign={'center'} w={280}>
          <Text color='gray' fontSize='12px'>{new Date().getFullYear()} © Built by Kyle </Text>
    </Box>
    </> :

    <Flex gap={5} mt={2} flexDirection={'column'}>
      {[...Array(10)].map(() => <LoadingEffect/>)}
    </Flex>

  )
}

const LoadingEffect = () => {

  return (
    <Flex gap={5} mb={2}>
      <Box >
        <SkeletonCircle size={10} />
      </Box>

      <Flex direction={'column'} w={'50%'} gap={2} justify={'center'}>
        <Skeleton h={2} />
        <Skeleton h={2} />
      </Flex> 
    </Flex>
  )

}

export default Users
