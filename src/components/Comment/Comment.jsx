import { Flex, Avatar, Text, Link, Button, Box } from '@chakra-ui/react'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React, { useState } from 'react'

const Comment = ({img, name, username, comment, time}) => {

    const [isLiked, setIsLiked] = useState(false);

  return (
    <Flex w={'100%'}>
        <Avatar src={img} name={name} size={'sm'} m={4}></Avatar>
        <Flex direction={'row'} justify={'space-between'} flex={1}>
            <Flex direction={'column'} my={4}>
                <Text>
                    <span><Link href='/profile' fontWeight={'bold'} mr={2}>{username}</Link></span>
                    <span>{comment}</span>
                </Text>

                <Flex>
                    <Text as={'span'} fontSize='12px' color='gray' mr={2}>{time}</Text>
                    <Text 
                    backgroundColor={'transparent'} 
                    border='none' 
                    fontSize={12} 
                    h={12} 
                    fontWeight={'bold'}
                    cursor={'pointer'}
                    >Reply</Text>
                </Flex>
                
            </Flex>
            <Flex align={'start'} mt={4} cursor={'pointer'}>
                <Box onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? <IoHeartSharp color='#f70776'/> : <IoHeartOutline />}
                </Box>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default Comment
