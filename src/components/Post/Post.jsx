import React, { useEffect, useState, useRef } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Heading, Link, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { Router, Link as RouterLink } from 'react-router-dom';
import { ThreeDots, UnlikeLogo, CommentLogo, SendLogo, SaveLogo, NotificationsLogo } from '../../assets/constants';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import useAuthStore from '../../store/AuthStore';
import { timeAgo } from '../../utils/timeAgo';
import useLikePost from '../../hooks/useLikePost';
import useAddComment from '../../hooks/useAddComment';
import Comment from '../Comment/Comment';
import useGetUserProfilebyId from '../../hooks/useGetUserProfilebyId';
import useGetComments from '../../hooks/useGetComments';


const Post = ({post}) => {
  
  const [commentInput, setCommentInput] = useState("");
  const {userProfile, isFetchingProfile} = useGetUserProfilebyId(post.createdBy)
  const {isLiked, likePost, isLoading} = useLikePost(post)
  const {addComment} = useAddComment()
  const {comments, isFetchingComments} = useGetComments(post.id)
  const commentInputRef = useRef()
  const likePostHandler = () => {

    if(isLoading) return
    likePost(post)

  }

  const addCommentHandler = () => {

    addComment(post.id, commentInput)

    setCommentInput("")

  }


  console.log(post.caption)
  console.log(post.id)
  console.log(comments)

  

  return (!isFetchingProfile ?

    <Flex pt={10} w={'468px'} direction={'column'} mx={10}>
       <Flex py={2} justify={"space-between"}>
           <Flex >
            <Link as={RouterLink} to={`/${userProfile?.username}`}>
                <Avatar src={userProfile?.profileURL} mr={2} />
           </Link>
           <Flex direction={'column'}>
               <Flex justify='flex-start' align={'center'}>
                   <Link as={RouterLink} to={`/${userProfile?.username}`} fontWeight='bold' style={{textDecoration: 'none'}} > {userProfile?.username} </Link >
               </Flex>
               <Flex justify='flex-start' align={'center'}>
                   <Text fontSize='sm' style={{textDecoration: 'none'}}>{post.location}</ Text>
               </Flex>
           </Flex>
           </Flex>
           <Box>
               <ThreeDots />
           </Box>
       </Flex>
       <Image src={post.photoURL}  borderRadius={4} aspectRatio={3/4} objectFit={'cover'} maxH={600} alt={'feed post image'}></Image>
       <Flex my={2} direction={'row'} justify='space-between'>
           <Flex direction={'row'}>
               <Box pr={2} onClick={likePostHandler} cursor={'pointer'}> 
                   {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
               </Box>
               <Box pr={2} cursor={'pointer'} onClick={() => commentInputRef.current.focus()}> 
                   <CommentLogo />
               </Box>
               <Link as={RouterLink } to={'/index'}> 
                   <SendLogo />
               </Link>
           </Flex>
           <Link as={RouterLink } to={'/index'}> 
                   <SaveLogo />
           </Link>
       </Flex>
       <Heading as='h6' size='sm' mb={1}> {post.likes.length} likes</Heading>
  
       <Flex direction={'flex-start'} wrap={'wrap'}>
           <Text>
           <span ><Link as={RouterLink} to={`/${userProfile?.username}`} fontWeight={'bold'} style={{textDecoration: 'none'}}> {userProfile?.username}</Link></span>
           <span> {post.caption} </span>
           </Text>
           
       </Flex>
       <Text fontSize='xs' color={"gray"}> {timeAgo(post.createdAt)}</Text>
       <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
        <Text>{comments.length}</Text>
            {!isFetchingComments && comments.map((comment) => <Comment comment={comment}/>)}
        </VStack>


       <InputGroup>
           <Input placeholder='Add a comment' size={'sm'} variant={'flushed'} value={commentInput} onChange={(e) => setCommentInput(e.target.value)} ref={commentInputRef}></Input>
           <InputRightAddon backgroundColor={'transparent'} border={'none'} _hover={{color:'gray'}} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
       </InputGroup>
        
    </Flex> :
            <Flex p={4} my={4}>
                <VStack>
                    <HStack >
                        <SkeletonCircle size={10}/>
                        <VStack>
                            <Skeleton w={400} h={3}/>
                            <Skeleton w={400} h={3}/>
                        </VStack>
                    </HStack>
                    <Skeleton w={'100%'} h={500}>
                        <div>no text</div>
                    </Skeleton>
                </VStack>
            </Flex>
  )
 
}

export default Post

