import React from 'react'
import { Image, GridItem, Box, Flex, Link, Grid, HStack, Text } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import { FaComment } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import Popup from './Popup';


const ProfilePhoto = ( {name, link}) => {



  return (
    <GridItem  
    maxH={300}
    overflow={'hidden'}
    cursor={'pointer'}
    position={'relative'}
    gap={2}
    >
        {/* overlay */}
        <Flex 
        h={'full'} 
        w={'full'} 
        position={'absolute'} 
        justify={'center'} 
        align={'center'}
        gap={10}
        opacity={0}
        _hover={{opacity:'1'}}
        backgroundColor='blackAlpha.500' 
        overflow={'hidden'}
        transition={'all 0.2s ease'}
        zIndex={1}
        >
            <HStack gap={1}>
            <Link as={RouterLink} ><FaHeart color='white' fontSize={22} opacity={1}/></Link>
            <Text color={'white'} fontWeight={'bold'}>2</Text>  
            </HStack>
            <HStack gap={1}>
            <Link as={RouterLink} ><FaComment color='white' fontSize={22} opacity={1}/></Link>
            <Text color={'white'} fontWeight={'bold'}>3</Text>  
            </HStack>
        </Flex>
        <Image 
        backgroundColor={'black'}
        objectFit={'cover'}
        name={name} 
        src={link}
        aspectRatio={1/1}
        maxH={'300px'}
        />

        

        
    </GridItem>
  )
}

export default ProfilePhoto
