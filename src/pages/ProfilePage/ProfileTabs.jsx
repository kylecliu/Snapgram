import { Box, Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import { BsGrid3X3 } from "react-icons/bs";

const ProfileTabs = () => {

  return (

        <Flex direction={'column'} w={{base: '100%', sm: '70%' }} align={'center'}>
            <Divider maxW={'800px'}/>
            <Flex 
            w={'70%'}
            maxW={'800px'}
            align={'center'} 
            justify={'center'} 
            >
                <Flex gap={1} align={'center'}>
                    <BsGrid3X3 fontSize={10}></BsGrid3X3>
                    <Box 
                    py={3}
                    fontSize={{base: 12, sm: 15}}
                    >
                    POSTS
                    </Box>
                </Flex>

            </Flex>
        </Flex>

  )
}

export default ProfileTabs
