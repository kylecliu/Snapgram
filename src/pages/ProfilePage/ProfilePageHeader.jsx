import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link, Heading, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import useUserProfileStore from '../../store/ProfileStore'
import useAuthStore from '../../store/AuthStore'
import EditPage from '../EditPage/EditPage'
import useFollowUser from '../../hooks/useFollowUser'


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
                <Link 
                    as={RouterLink} 
                    to={'/profile'} 
                    style={{textDecoration:'none'}} 
                    fontWeight={'bold'} 
                    fontSize={20} 
                    mr={4}>
                
                {userProfile.username}
                </Link>
                </Text>

                {isOwnProfile && <Button backgroundColor={'lightgray'} fontSize={12} h='25px' onClick={onOpen}>Edit Profile</Button>}

                {isOpen && <EditPage isOpen={isOpen} onClose={onClose}/> }

                {isAnotherProfile && <Button backgroundColor={'#0095F6'}  color={'white'}  fontSize={12} h='25px' _hover={'blue.600'} isLoading={isUpdating} onClick={followOrUnfollowUser}>{ isFollowing ? Unfollow: Follow }</Button>}
                
                </Flex>
                <Flex direction={'flex-start'} gap={8} mt={4} mb={4} display={{base: 'none', md: 'none', lg:'flex'}} fontWeight={'bold'} fontSize={15}>
                    <Box>{userProfile.posts.length} posts</Box>
                    <Box>{userProfile.followers.length} followers</Box>
                    <Box>{userProfile.following.length} following</Box>
                </Flex>
                <Heading as='h6' size={'xs'}>{userProfile.fullName}</Heading>
                <Text fontSize={15} style={{wordWrap: 'break-word'}}>{userProfile.bio} </Text>
            </Flex>
            
        </Flex>

    </Flex>
      )
    }
    

export default ProfilePageHeader
