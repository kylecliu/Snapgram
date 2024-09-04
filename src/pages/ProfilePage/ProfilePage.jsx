import { Box, Button, Flex, Link, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import useGetUserProfile from '../../hooks/useGetUserProfile'
import ProfilePageHeader from './ProfilePageHeader'
import ProfilePagePhotos from './ProfilePagePhotos'
import ProfileTabs from './ProfileTabs'

const ProfilePage = () => {

  const { username } = useParams();

  const { userProfile, isLoading } = useGetUserProfile(username);

  const  userNotFound = !isLoading && !userProfile;

  console.log(userProfile)
  

  if(userNotFound) return < UserNotFound/>

  return (
    
    <>
      <Flex align={'center'} direction={'column'} position={'relative'} mt={{base: 5, sm:10}}>

        { isLoading && <LoadingEffect /> }

        { !isLoading && userProfile && (
          <>
          <ProfilePageHeader />
          <ProfileTabs />
          <ProfilePagePhotos />
          </>)}
      </Flex>
    </>
 
    
  )
}

export default ProfilePage


const UserNotFound =() => {

  return (
    <>
      <Flex h={'100vh'} w={'100%'} justify={'center'} align={'center'} direction={'column'}>
        <Text fontSize={'6xl'} mb={20}>
          User Not Found!
        </Text>
        <Link href='/'>
            <Button>Go Back</Button>
          </Link>
      </Flex>
    </>
  )
}

const LoadingEffect = () => {

  return (
    <Flex w={'70%'} mb={5} >  
      <Box mr={10}>
        <SkeletonCircle size={{base: '100px', md: '150px'}} m={{base: '5px', md: '10px'}}/>
      </Box>

      <Flex direction={'column'} w={'100%'} gap={5} justify={'center'}>
        <Skeleton h={15} w={'70%'}/>
        <Skeleton h={15} w={'70%'} />
        <Skeleton h={15} w={'70%'} />
      </Flex>
    </Flex>
  )
}