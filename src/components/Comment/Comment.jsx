import { Flex, Avatar, Text, Link, Button, Box } from '@chakra-ui/react'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React, { useState } from 'react'
import useUserProfileStore from '../../store/ProfileStore';
import { timeAgo } from '../../utils/timeAgo';

const Comment = ({comment}) => {

    const [isLiked, setIsLiked] = useState(false);
    const userProfile = useUserProfileStore(state => state.userProfile)
    console.log(userProfile)

  return (
    <Flex w={'100%'}>
        <Link href={`/${userProfile?.username}`}>
        <Avatar src={comment.photo} name={comment.username} size={'sm'} m={4}></Avatar>
        </Link>
        <Flex direction={'row'} justify={'space-between'} flex={1}>
            <Flex direction={'column'} justify={'center'}>
                <Text>
                    <span><Link href={`/${userProfile?.username}`} fontWeight={'bold'} mr={2}>{comment.username}</Link></span>
                    <span>{comment.comment}</span>
                </Text>

                <Flex>
                    <Text as={'span'} fontSize='12px' color='gray' mr={2}>{timeAgo(comment.createdAt)}</Text>
                    <Text 
                    backgroundColor={'transparent'} 
                    border='none' 
                    fontSize={12} 
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


