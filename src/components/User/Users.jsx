import React from 'react'
import User from './User'
import Profile from './Profile'
import { Flex, Text } from '@chakra-ui/react'
import useSuggestedUsers from '../../hooks/useSuggestedUsers'
import useSearchUser from '../../hooks/useSearchUser'


const Users = () => {

  const { isLoading, suggestedUser } = useSuggestedUsers()
  const {isFetching, user, searchUser, setUser} = useSearchUser()


  if(isLoading) return null

  return (
    <>

    <Profile  />
    {suggestedUser.length === 0 ? null : <Text fontWeight={'bold'} color={'gray'}>Suggested for you</Text>}
    
    <Flex direction={'column'} py={2}>

      {suggestedUser.map((user) => <User user={user} id={user.id} setUser={setUser}/>)}

    </Flex>
    </>

  )
}

export default Users
