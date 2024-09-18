import React from 'react'
import { Flex, Box, Text, Link, Avatar } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';

const ToProfile = () => {

    const authUser = useAuthStore(state => state.user)

  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} justify={{base: 'center', sm: 'flex-start'}}>
        <Link to={`/${authUser?.username}`} as={RouterLink} style={{textDecoration: 'none'}}>
            <Flex  p={2} borderRadius={4} justify={'center'}>
                <Box >
                    <Avatar size='xs' name={authUser?.username} src={authUser?.profileURL || ""} />
                </Box>
                <Text display={{base:'none', lg:'inline'}} pl={5}>Profile</Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default ToProfile
