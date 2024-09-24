import { Flex, Avatar, Text, Link, Box } from '@chakra-ui/react'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React from 'react'
import { timeAgo } from '../../utils/timeAgo';
import useGetUserProfilebyId from '../../hooks/useGetUserProfilebyId';
import useAuthStore from '../../store/AuthStore';
import useDeleteComment from '../../hooks/useDeleteComment';
import useLikeComment from '../../hooks/useLikeComment';

const Comment = ({comment}) => {

    const authUser = useAuthStore(state => state.user)
    const {userProfile, isFetchingProfile} = useGetUserProfilebyId(comment.createdBy)
    const { isDeletingComment ,deleteComment} = useDeleteComment()
    const {isLiked, likeComment} = useLikeComment(comment)
    const sameUser = authUser?.uid === userProfile?.uid

    const deleteCommentHandler = () => {

        if(isDeletingComment) return

        if(window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment(comment)
        }
    }

  return (
    !isFetchingProfile && userProfile ? <Flex w={'100%'} >
        <Link href={`/${userProfile?.username}`}>
            <Avatar src={userProfile?.profileURL} name={userProfile?.username} size={'sm'} m={4}></Avatar>
        </Link>
        <Flex direction={'row'} justify={'space-between'} flex={1}>
            <Flex direction={'column'} justify={'center'} >
                <Text maxW={{base: '350px'}} fontSize={{base: 12, sm: 16}}>
                    <span><Link href={`/${userProfile?.username}`} fontWeight={'bold'} mr={2} >{userProfile?.username}</Link></span>
                    <span>{comment.comment}</span>
                </Text>

                <Flex>
                    <Text as={'span'} fontSize={{base: 10, sm: 12}} color='gray' mr={2}>{timeAgo(comment.createdAt)}</Text>
                    {sameUser ?  <Box 
                    backgroundColor={'transparent'} 
                    border='none' 
                    fontSize={12} 
                    fontWeight={'bold'}
                    cursor={'pointer'}
                    onClick={deleteCommentHandler}
                    >Delete</Box> : null}

                </Flex>
                
            </Flex>
            <Flex mt={4} mr={3} cursor={'pointer'} >
                <Box onClick={() => likeComment(comment)}>
                    {isLiked ? <IoHeartSharp color='#f70776'/> : <IoHeartOutline />}
                </Box>
            </Flex>
        </Flex>
    </Flex> : null
  )
}

export default Comment


