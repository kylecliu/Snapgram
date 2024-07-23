import React from 'react'
import User from './User'
import Profile from './Profile'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack } from '@chakra-ui/react'
import useSuggestedUsers from '../../hooks/useSuggestedUsers'
import useSearchUser from '../../hooks/useSearchUser'



const Users = () => {

  const { isLoading, suggestedUser } = useSuggestedUsers()
  const {isFetching, user, searchUser, setUser} = useSearchUser()


  if(isLoading) return null

  return (
    <>

    <Profile img={'img4.png'} username='ray'/>
    {suggestedUser.length === 0 ? null : <Text fontWeight={'bold'} color={'gray'}>Suggested for you</Text>}
    
    <Flex direction={'column'} py={2}>

      {suggestedUser.map((user) => <User user={user} id={user.id} setUser={setUser}/>)}


      
      {/* <User img={'img2.png'} username={'tom'}/>
      <User img={'img3.png'} username={'amanda'}/>
      <User img={'img1.png'} username={'rozette'}/>
      <User img={'img4.png'} username={'blair'}/> */}

    </Flex>
    </>

  )
}

export default Users
