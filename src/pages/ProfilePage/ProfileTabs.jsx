import React from 'react'
import { Flex, Text, Link, Grid, GridItem, Image } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import { BsGrid3X3, BsFilePerson } from "react-icons/bs";
import { RiBookmarkLine } from "react-icons/ri";

const ProfileTabs = () => {

    const clickHandler = (e) => {
        e.target.style.borderTop = '1px solid black'
    }



  return (

        <Flex 
        w={'70%'} 
        gap={20} 
        align={'center'} 
        justify={'center'} 
        borderTop={'1px solid lightgray'}>
            <Flex  gap={1} align={'center'}>
                <BsGrid3X3 fontSize={10}></BsGrid3X3>
                <Link 
                py={3}
                as={RouterLink} 
                style={{textDecoration: 'none'}} 
                onClick={(e) => clickHandler(e)}
                fontSize={15}
                >
                POSTS
                </Link>
            </Flex>

            <Flex  gap={1} align={'center'}>
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
            </Flex>

        </Flex>

  )
}

export default ProfileTabs
