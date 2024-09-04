import React from 'react'
import { MessagesLogo } from '../../assets/constants'
import { Flex, Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const Messages = () => {
  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} justify={{base: 'center', sm: 'flex-start'}}>
        <Link to={"/"} as={RouterLink} style={{textDecoration: 'none'}}>
            <Flex  p={2} borderRadius={4} justify={'center'}>
                <Box >
                    <MessagesLogo />
                </Box>
                <Text display={{base:'none', lg:'inline'}} pl={5}>Messages</Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Messages
