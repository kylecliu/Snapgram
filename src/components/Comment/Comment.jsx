import { Flex, Avatar, Text, Link, Box } from '@chakra-ui/react'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React, { useState } from 'react'
import { timeAgo } from '../../utils/timeAgo';
import useGetUserProfilebyId from '../../hooks/useGetUserProfilebyId';
import useAuthStore from '../../store/AuthStore';

const Comment = ({comment, post}) => {

    const authUser = useAuthStore(state => state.user)
    const [isLiked, setIsLiked] = useState(comment?.likedBy?.includes(authUser));
    const {userProfile, isFetchingProfile} = useGetUserProfilebyId(comment.createdBy)

  return (
    !isFetchingProfile && userProfile && post.id === comment.postId ? <Flex w={'100%'}>
        <Link href={`/${userProfile?.username}`}>
            <Avatar src={userProfile?.profileURL} name={userProfile?.username} size={'sm'} m={4}></Avatar>
        </Link>
        <Flex direction={'row'} justify={'space-between'} flex={1}>
            <Flex direction={'column'} justify={'center'}>
                <Text>
                    <span><Link href={`/${userProfile?.username}`} fontWeight={'bold'} mr={2}>{userProfile?.username}</Link></span>
                    <span>{comment.comment}</span>
                </Text>

                <Flex>
                    <Text as={'span'} fontSize='12px' color='gray' mr={2}>{timeAgo(comment.createdAt)}</Text>
                    {/* <Text 
                    backgroundColor={'transparent'} 
                    border='none' 
                    fontSize={12} 
                    fontWeight={'bold'}
                    cursor={'pointer'}
                    >Reply</Text> */}
                </Flex>
                
            </Flex>
            <Flex align={'start'} mt={4} cursor={'pointer'}>
                <Box onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? <IoHeartSharp color='#f70776'/> : <IoHeartOutline />}
                </Box>
            </Flex>
        </Flex>
    </Flex> : null
  )
}

export default Comment


