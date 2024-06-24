import React, { useEffect, useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import ProfilePageHeader from './ProfilePageHeader'
import ProfilePagePhotos from './ProfilePagePhotos'
import ProfileTabs from './ProfileTabs'
import Popup from './Popup'

const ProfilePage = () => {



  return (
    <>
      <Flex align={'center'} direction={'column'} position={'relative'}>
          <ProfilePageHeader />
          <ProfileTabs />
          <ProfilePagePhotos />
      </Flex>
    </>
 
    
  )
}

export default ProfilePage
