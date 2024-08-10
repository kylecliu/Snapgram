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


const Post = ({post, isFetching}) => {
  
  const [comment, setComment] = useState();
  const user = useAuthStore(state => state.user)
  const {isLiked, checkIsLiked, likePost, isLoading} = useLikePost()
  const {isUpdating, addComment} = useAddComment()
  const commentRef = useRef()
  const likePostHandler = () => {

    if(isLoading) return
    likePost(post)

  }

  const addCommentHandler = () => {

    if(isUpdating) return 

    addComment(post.id, comment)

  }

  useEffect(() => {

    checkIsLiked(post)

  }, [])



  
  return (!isFetching ?

    <Flex pt={10} w={'468px'} direction={'column'} mx={10}>
       <Flex py={2} justify={"space-between"}>
           <Flex >
            <Link as={RouterLink} to={`/${post.username}`}>
                <Avatar src={post.profileURL} mr={2} />
           </Link>
           <Flex direction={'column'}>
               <Flex justify='flex-start' align={'center'}>
                   <Link as={RouterLink} to={`/${post.username}`} fontWeight='bold' style={{textDecoration: 'none'}} > {post.username} </Link >
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
               <Box pr={2} cursor={'pointer'} onClick={() => commentRef.current.focus()}> 
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
           <span ><Link as={RouterLink} to={`/${post.username}`} fontWeight={'bold'} style={{textDecoration: 'none'}}> {post.username}</Link></span>
           <span> {post.caption} </span>
           </Text>
           
       </Flex>
       <Text fontSize='xs' color={"gray"}> {timeAgo(post.createdAt)}</Text>
       <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
            { post.comments.map((comment) => <Comment comment={comment}/>)}
        </VStack>


       <InputGroup>
           <Input placeholder='Add a comment' size={'sm'} variant={'flushed'} value={comment} onChange={(e) => setComment(e.target.value)} ref={commentRef}></Input>
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
