import React, { useEffect, useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import ProfilePageHeader from './ProfilePageHeader'
import ProfilePagePhotos from './ProfilePagePhotos'
import ProfileTabs from './ProfileTabs'
import SignupPrompt from '../../components/SignupPrompt/SignupPrompt'
import useAuthStore from '../../store/AuthStore'

const ProfilePage = () => {

  const user = useAuthStore(((state) => state.user))

  return (
    <>
      {user ? null : <SignupPrompt />}
      <Flex align={'center'} direction={'column'} position={'relative'} mt={10}>
          <ProfilePageHeader />
          <ProfileTabs />
          <ProfilePagePhotos />
      </Flex>
    </>
 
    
  )
}

export default ProfilePage
