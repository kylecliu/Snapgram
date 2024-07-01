import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import useAuthStore from '../../store/AuthStore'

const ProfilePageHeader = () => {

        const user = useAuthStore(state => state.user)

      return (
    <Flex direction={'column'} justify={'center'} w={'70%'} p={10} >
        <Flex gap={10} direction={{base: 'column', md: 'row'}}>
            <Flex align={'center'} justify={'center'}>
                <Avatar src={user.profileURL} size={'2xl'} name={user.fullName} ml={3}></Avatar>
            </Flex>
            <Flex direction={'column'}>
                <Flex py={2} gap={2} align={'center'}>
                <Text 
            as='span' 
            >
                <Link as={RouterLink} to={'/profile'} style={{textDecoration:'none'}} fontWeight={'bold'} fontSize={20} mr={4}>{user.username}</Link>
                </Text>
                <Button backgroundColor={'lightgray'} fontSize={12} h='25px'>Edit Profile</Button>
                </Flex>
                <Flex direction={'flex-start'} gap={8} mt={4} mb={4} display={{base: 'none', md: 'none', lg:'flex'}}>
                    <Box>{user.posts.length} posts</Box>
                    <Box>{user.followers.length} followers</Box>
                    <Box>{user.following.length} following</Box>
                </Flex>
                <Heading as='h6' size={'xs'}>{user.fullName}</Heading>
                <Text fontSize={15} style={{wordWrap: 'break-word'}}>{user.bio} </Text>
            </Flex>
            
        </Flex>

    </Flex>
      )
    }
    

export default ProfilePageHeader
