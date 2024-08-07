import React from 'react'
import { Flex, Box, Text, Link, Avatar } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';

const ToProfile = () => {

    const authUser = useAuthStore(state => state.user)
    console.log("Sidebar")
    console.log(localStorage.getItem('user-info'))
    console.log(authUser)

  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2}>
        <Link to={`/${authUser?.username}`} as={RouterLink} style={{textDecoration: 'none'}}>
            <Flex  p={2} borderRadius={4} justify={'center'}>
                <Box >
                    <Avatar size='xs' name='photo' src={authUser?.profileURL || ""} />
                </Box>
                <Text display={{base:'none', md:'inline'}} pl={5}>Profile</Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default ToProfile
