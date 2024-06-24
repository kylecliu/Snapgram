import React from 'react'
import User from './User'
import Profile from './Profile'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack } from '@chakra-ui/react'

const Users = () => {
  return (
    <>
    <Profile img={'img4.png'} username='ray'/>
    <Text fontWeight={'bold'} color={'gray'}>Suggested for you</Text>
    <Flex direction={'column'} py={2}>
      
      <User img={'img2.png'} username={'tom'}/>
      <User img={'img3.png'} username={'amanda'}/>
      <User img={'img1.png'} username={'rozette'}/>
      <User img={'img4.png'} username={'blair'}/>

    </Flex>
    </>

  )
}

export default Users
