import { Avatar, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useFollowUser from '../../hooks/useFollowUser'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/AuthStore'
import useUserProfileStore from '../../store/ProfileStore'
import EditPage from '../EditPage/EditPage'
import ProfileStats from './ProfileStats'
import { useColorModeValue } from '@chakra-ui/react'

 
const ProfilePageHeader = () => {

    const userProfile = useUserProfileStore(state => state.userProfile);
    const authUser = useAuthStore(state => state.user);
    const { isUpdating, isFollowing, followOrUnfollowUser } = useFollowUser(userProfile.uid);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logOutHandler } = useLogout()
    const buttonColor = useColorModeValue('lightgray', 'gray')

    const isOwnProfile = authUser && authUser.username === userProfile.username;
    const isAnotherProfile = authUser && authUser.username !== userProfile.username;

    return (

        <Flex direction={'column'} justify={'center'} w={{base: '100%', sm:'70%'}} maxW={'800px'} p={{base: 5, md: 10}} >
            
            {/* Adding extra padding due to SignupPrompt being fixed in position so there will be enouch spacing between SignupPrompt and the profile */}
            {authUser? null : <Flex h={{base: 5, md: 0}}></Flex>} 

            {/* user profile avatar on a small screen */}
            <Flex align={'center'} justify={'center'} display={{base: 'flex', sm:'none'}} mb={2}>
                <Avatar src={userProfile.profileURL} size={'xl'} name={userProfile.username} ></Avatar>
            </Flex>

            {/* user profile photo on a larger screen and user info */}
            <Flex gap={{sm: 18, lg: 25}} w={'100%'} justify={'center'}>
                <Flex align={'center'} justify={'center'} mr={{base: 5}} display={{base: 'none', sm: 'flex'}}>
                    <Avatar src={userProfile.profileURL} size={{base:'xl', md:'2xl'}} name={userProfile.username}></Avatar>
                </Flex>
                <Flex direction={'column'}  >
                    <Flex py={2} gap={2} align={'center'}>
                    <Text as='span' fontWeight={'bold'} fontSize={{base: 18, md: 20}} mr={4}>
                        {userProfile.username}
                    </Text>

                    {isOwnProfile && <Button backgroundColor={buttonColor} fontSize={12} h={{ base: '22px' , md:'28px'}} onClick={onOpen}>Edit</Button>}

                     <EditPage isOpen={isOpen} onClose={onClose}/> 

                    {authUser?.uid === userProfile.uid ? <Button backgroundColor={buttonColor} fontSize={12} h={{ base: '22px' , md:'28px'}} onClick={logOutHandler} display={{base:'block', sm: 'none'}}>Log out</Button> : null}

                    {isAnotherProfile && <Button backgroundColor={'#0095F6'}  color={'white'}  fontSize={12} h={{ base: '22px' , md:'28px'}} _hover={'blue.600'} isLoading={isUpdating} onClick={followOrUnfollowUser}>{ isFollowing ? "Unfollow": "Follow" }</Button>}
                    
                    </Flex>
                    <ProfileStats userProfile={userProfile}/>
                    <Heading as='h6'fontSize={{base: 12, md: 15}}>{userProfile.fullName}</Heading>
                    <Text fontSize={{base: 12, sm:15}} style={{wordWrap: 'break-word'}}>{userProfile.bio} </Text>
                </Flex>
            </Flex>
        </Flex>
      )
    }
    

export default ProfilePageHeader
