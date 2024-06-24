import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'

const ProfilePageHeader = () => {

      return (
    <Flex direction={'column'} justify={'center'} w={'70%'} p={10} backgroundColor={'pink'} >
        <Flex gap={10}>
            <Avatar src='img3.png' size={'2xl'} name='Jane' ml={3}></Avatar>
            <Flex direction={'column'}>
                <Flex py={2} gap={4} align={'center'} display={{sm: 'column', md: 'row'}}>
                <Text 
            as='span' 
            >
                <Link as={RouterLink} to={'/profile'} style={{textDecoration:'none'}} fontWeight={'bold'} fontSize={20} mr={4}>visitwallonia</Link>
                </Text>
                <Button backgroundColor={'lightgray'} fontSize={12} h='25px'>Edit Profile</Button>
                </Flex>
                <Flex direction={'flex-start'} gap={8} mt={4} mb={4} display={{base: 'none', md: 'none', lg:'flex'}}>
                    <Box>75 posts</Box>
                    <Box>100 followers</Box>
                    <Box>20 following</Box>
                </Flex>
                <Heading as='h6' size={'xs'}>Visit Wallonia</Heading>
                <Text fontSize={15} style={{wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </Flex>
            
        </Flex>

    </Flex>
      )
    }
    

export default ProfilePageHeader
