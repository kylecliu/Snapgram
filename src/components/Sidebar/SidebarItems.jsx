import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const SidebarItems = (props) => {
  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5}>
        <Link to={props.route} as={RouterLink} style={{textDecoration: 'none'}}>
            <HStack py={4} pl={2} pr={2} borderRadius={4} >
                <Box  px={'2px'} mr={2}>
                    {props.logo}
                </Box>
                <Text display={{base:'none', md:'inline'}}>{props.title}</Text>
            </HStack>
        </Link>
    </Flex>
  )
}

export default SidebarItems
