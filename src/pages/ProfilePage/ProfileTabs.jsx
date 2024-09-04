import React from 'react'
import { Flex, Box, Text, Link, Grid, GridItem, Image, Divider } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import { BsGrid3X3, BsFilePerson } from "react-icons/bs";
import { RiBookmarkLine } from "react-icons/ri";

const ProfileTabs = () => {


  return (

        <Flex direction={'column'} w={{base: '100%', sm: '70%' }} align={'center'}>
            <Divider maxW={'800px'}/>
            <Flex 
            w={'70%'}
            maxW={'800px'}
            gap={20} 
            align={'center'} 
            justify={'center'} 
            >
                

                <Flex  gap={1} align={'center'}>
                    <BsGrid3X3 fontSize={10}></BsGrid3X3>
                    <Box 
                    py={3}
                    style={{textDecoration: 'none'}} 
                    fontSize={15}
                    >
                    POSTS
                    </Box>
                </Flex>

                {/* <Flex  gap={1} align={'center'}>
                    <RiBookmarkLine fontSize={11}></RiBookmarkLine>
                    <Link 
                    py={3}
                    as={RouterLink} 
                    style={{textDecoration: 'none'}} 
                    onClick={(e) => clickHandler(e)}
                    fontSize={15}
                    >SAVED</Link>
                </Flex>

                <Flex  gap={1} align={'center'}>
                    <BsFilePerson fontSize={11}></BsFilePerson>
                    <Link 
                    py={3}
                    as={RouterLink} 
                    style={{textDecoration: 'none'}} 
                    onClick={(e) => clickHandler(e)}
                    fontSize={15}
                    >TAGGED</Link>
                </Flex> */}

            </Flex>
        </Flex>

  )
}

export default ProfileTabs
