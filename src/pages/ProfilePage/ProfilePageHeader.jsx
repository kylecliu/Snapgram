import { Avatar, Box, Button, Flex, Heading, Link, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/AuthStore'
import useUserProfileStore from '../../store/ProfileStore'
import EditPage from '../EditPage/EditPage'
import ProfileStatistics from './ProfileStatisctics'



const ProfilePageHeader = () => {

        const userProfile = useUserProfileStore(state => state.userProfile);
        const authUser = useAuthStore(state => state.user);
        const { isUpdating, isFollowing, followOrUnfollowUser } = useFollowUser(userProfile.uid);
        

        const { isOpen, onOpen, onClose } = useDisclosure();

        const isOwnProfile = authUser && authUser.username === userProfile.username;
        const isAnotherProfile = authUser && authUser.username !== userProfile.username;

      

      return (
    <Flex direction={'column'} justify={'center'} w={'70%'} p={10} >
        <Flex gap={10} direction={{base: 'column', md: 'row'}}>
            <Flex align={'center'} justify={'center'}>
                <Avatar src={userProfile.profileURL} size={'2xl'} name={userProfile.fullName} ml={3}></Avatar>
            </Flex>
            <Flex direction={'column'}>
                <Flex py={2} gap={2} align={'center'}>
                <Text 
            as='span' 
            >
                <Box 
                    style={{textDecoration:'none'}} 
                    fontWeight={'bold'} 
                    fontSize={20} 
                    mr={4}>
                {userProfile.username}
                </Box>
                </Text>

                {isOwnProfile && <Button backgroundColor={'lightgray'} fontSize={12} h='28px' onClick={onOpen}>Edit Profile</Button>}

                {isOpen && <EditPage isOpen={isOpen} onClose={onClose}/> }

                {isAnotherProfile && <Button backgroundColor={'#0095F6'}  color={'white'}  fontSize={12} h='30px' _hover={'blue.600'} isLoading={isUpdating} onClick={followOrUnfollowUser}>{ isFollowing ? "Unfollow": "Follow" }</Button>}
                
                </Flex>
                <ProfileStatistics userProfile={userProfile}/>
                <Heading as='h6' size={'xs'}>{userProfile.fullName}</Heading>
                <Text fontSize={15} style={{wordWrap: 'break-word'}}>{userProfile.bio} </Text>
            </Flex>
            
        </Flex>

    </Flex>
      )
    }
    

export default ProfilePageHeader
