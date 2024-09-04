import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { Flex, Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} justify={{base: 'center', sm: 'flex-start'}}>
        <Link to={"/"} as={RouterLink} style={{textDecoration: 'none'}}>
            <Flex  p={2} borderRadius={4} justify={'center'}>
                <Box >
                    <GrHomeRounded fontSize={24}/>
                </Box>
                <Text display={{base:'none', lg:'inline'}} pl={5}>Home</Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Home
