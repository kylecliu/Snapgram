import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const SidebarItems = (props) => {
  return (
    <div>
        <Link to={props.route} as={RouterLink}>
            <HStack py={4} pl={2} pr={2} _hover={{backgroundColor: "#d6dbd5"}} borderRadius={4} >
                <Box  px={'2px'} mr={2}>
                    {props.logo}
                </Box>
                <Text display={{base:'none', md:'inline'}}>{props.title}</Text>
            </HStack>
        </Link>
    </div>
  )
}

export default SidebarItems
