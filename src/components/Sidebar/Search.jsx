import React from 'react'
import { SearchLogo } from '../../assets/constants'
import { Flex, Box, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const Search = () => {
  return (
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2}>
        <Link to={"/"} as={RouterLink} style={{textDecoration: 'none'}}>
            <Flex  p={2} borderRadius={4} justify={'center'}>
                <Box >
                    <SearchLogo />
                </Box>
                <Text display={{base:'none', md:'inline'}} pl={5}>Search</Text>
            </Flex>
        </Link>
    </Flex>
  )
}

export default Search
