import { Avatar, Box, Button, Flex, Heading, Link, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/AuthStore'
import useUserProfileStore from '../../store/ProfileStore'
import EditPage from '../EditPage/EditPage'
import ProfileStatistics from './ProfileStatisctics'
import useLogout from '../../hooks/useLogout'



const ProfilePageHeader = () => {

        const userProfile = useUserProfileStore(state => state.userProfile);
        const authUser = useAuthStore(state => state.user);
        const { isUpdating, isFollowing, followOrUnfollowUser } = useFollowUser(userProfile.uid);
        const { isOpen, onOpen, onClose } = useDisclosure();
        const { logOutHandler } = useLogout()

        const isOwnProfile = authUser && authUser.username === userProfile.username;
        const isAnotherProfile = authUser && authUser.username !== userProfile.username;

      

      return (
    <Flex direction={'column'} justify={'center'} w={{base: '100%', sm:'70%'}} maxW={'800px'} p={{base: 5, md: 10}} >
        <Flex align={'center'} justify={'center'} mr={{base: 5}} display={{base: 'flex', sm:'none'}}>
            <Avatar src={userProfile.profileURL} size={'xl'} name={userProfile.fullName} mb={2}></Avatar>
        </Flex>
        <Flex gap={{sm: 18, lg: 25}} w={'100%'} justify={'center'}>
            <Flex align={'center'} justify={'center'} mr={{base: 5}} display={{base: 'none', sm: 'flex'}}>
                <Avatar src={userProfile.profileURL} size={{base:'xl', md:'2xl'}} name={userProfile.fullName} ml={3}></Avatar>
            </Flex>
            <Flex direction={'column'}  >
                <Flex py={2} gap={2} align={'center'}>
                <Text 
            as='span' 
            >
                <Box 
                    style={{textDecoration:'none'}} 
                    fontWeight={'bold'} 
                    fontSize={{base: 18, md: 20}} 
                    mr={4}>
                {userProfile.username}
                </Box>
                </Text>

                {isOwnProfile && <Button backgroundColor={'lightgray'} fontSize={12} h={{ base: '20px' , md:'28px'}} onClick={onOpen}>Edit</Button>}

                {isOpen && <EditPage isOpen={isOpen} onClose={onClose}/> }

                {authUser.uid === userProfile.uid ? <Button backgroundColor={'lightgray'} fontSize={12} h={{ base: '20px' , md:'28px'}} onClick={logOutHandler} display={{base:'block', sm: 'none'}}>Log out</Button> : null}

                {isAnotherProfile && <Button backgroundColor={'#0095F6'}  color={'white'}  fontSize={12} h={{ base: '20px' , md:'28px'}} _hover={'blue.600'} isLoading={isUpdating} onClick={followOrUnfollowUser}>{ isFollowing ? "Unfollow": "Follow" }</Button>}
                
                </Flex>
                <ProfileStatistics userProfile={userProfile}/>
                <Heading as='h6'fontSize={{base: 12, md: 15}}>{userProfile.fullName}</Heading>
                <Text fontSize={{base: 12, sm:15}} style={{wordWrap: 'break-word'}}>{userProfile.bio} </Text>
            </Flex>

            
            
        </Flex>
        

    </Flex>
      )
    }
    

export default ProfilePageHeader
