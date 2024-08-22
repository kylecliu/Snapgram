import React, { useEffect, useState, useRef } from 'react'
import { Flex, Container, Box, Image, VStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Button, Text, HStack, Avatar, Heading, Link, Tooltip, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Divider  } from '@chakra-ui/react'
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
import { RiDeleteBin6Line } from "react-icons/ri";
import useDeletePost from '../../hooks/useDeletePost';
import { FaRegHeart } from 'react-icons/fa6';
import { LuSend } from 'react-icons/lu';
import { useDisclosure } from '@chakra-ui/react';
import { GoSmiley } from "react-icons/go";



const Post = ({post}) => {
  
  const [commentInput, setCommentInput] = useState("");
  const {userProfile, isFetchingProfile} = useGetUserProfilebyId(post.createdBy)
  const {isLiked, likePost, isLoading} = useLikePost(post)
  const {addComment} = useAddComment()
  const {comments, isFetchingComments} = useGetComments(post)
  const commentInputRef = useRef()
  const {isDeleting, deletePostHandler} = useDeletePost()
  const authUser = useAuthStore(state => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const likePostHandler = () => {

    if(isLoading) return
    likePost(post)

  }

  const addCommentHandler = () => {

    addComment(post.id, commentInput)

    setCommentInput("")

  }


  const deleteUserPostHandler = () => {

    if(isDeleting) return 

    if(window.confirm("Are you sure you want to delete this post?")) {

        deletePostHandler(post.id)

    } else { return }

}
  

  return (!isFetchingProfile ?

    <>

    <Flex pt={10} w={'468px'} direction={'column'} mx={10} mb={5}>
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

        <Flex gap={3} mb={1} mt={1}>
            
                <Tooltip label='Like' fontSize='md'>
                    <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={likePostHandler}>{isLiked ? <UnlikeLogo /> : <FaRegHeart />}</Box>
                </Tooltip> 

                {post?.likes?.length > 0 ? <Text fontWeight={'bold'}>{post?.likes?.length}</Text> : null}

                { authUser ? <Tooltip label='Comment' fontSize='md'>
                    <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={onOpen}><CommentLogo /></Box>
                </Tooltip> : <Tooltip label='Comment' fontSize='md'>
                    <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={onOpen}><CommentLogo /></Box>
                </Tooltip>}

                <Text fontWeight={'bold'}>{comments?.length}</Text>
                
                {/* <Link as={RouterLink} fontSize={24} fontWeight={'bolder'}><LuSend/></Link> */}


         </Flex>
        {authUser?.uid === userProfile?.uid ?                                    
            <Tooltip label='Delete' fontSize='md'>
                <Box fontSize={24} mb={1} mt={1} fontWeight={'bolder'} cursor={'pointer'} onClick={deleteUserPostHandler}><RiDeleteBin6Line /></Box>
            </Tooltip> : null}





           {/* <Flex direction={'row'}>
               <Box pr={2} onClick={likePostHandler} cursor={'pointer'}> 
                   {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
               </Box>
               <Text fontWeight={'bold'}>{post?.likes?.length > 0 ? post?.likes?.length : null}</Text>
               <Box pr={2} cursor={'pointer'} onClick={() => commentInputRef.current.focus()}> 
                   <CommentLogo />
               </Box>
               <Link as={RouterLink } to={'/index'}> 
                   <SendLogo />
               </Link>
               {authUser?.uid === userProfile?.uid ?                                    
                <Tooltip label='Delete' fontSize='md'>
                    <Box pl={2} fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={deleteUserPostHandler}><RiDeleteBin6Line /></Box>
                </Tooltip> : null}
           </Flex>
           <Link as={RouterLink } to={'/index'}> 
                   <SaveLogo />
           </Link> */}
       </Flex>
       {/* <Heading as='h6' size='sm' mb={1}> {post.likes.length} likes</Heading> */}
  
       <Flex direction={'flex-start'} wrap={'wrap'}>
           <Text>
           <span ><Link as={RouterLink} to={`/${userProfile?.username}`} fontWeight={'bold'} style={{textDecoration: 'none'}}> {userProfile?.username}</Link></span>
           <span> {post.caption} </span>
           </Text>
           
       </Flex>
       <Text fontSize='xs' color={"gray"}> {timeAgo(post.createdAt)}</Text>
       {/* <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
            {!isFetchingComments && comments.map((comment) => <Comment key={comment.commentId} comment={comment}/>)}
        </VStack> */}


       {/* <InputGroup>
           <Input placeholder='Add a comment' size={'sm'} variant={'flushed'} value={commentInput} onChange={(e) => setCommentInput(e.target.value)} ref={commentInputRef}></Input>
           <InputRightAddon backgroundColor={'transparent'} border={'none'} _hover={{color:'gray'}} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
       </InputGroup> */}
        
    </Flex> 

            {/* Modal */}
            <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            isCentered={true} 
            size={{base: '3xl', md: '5xl'}}
            >
                <ModalOverlay/>
                <ModalContent>
                  <ModalCloseButton />
                  {/* Small screen user info display */}
                  <ModalBody backgroundColor='white' py={0} pl={0}>
                    <Flex borderBottom={'1px solid lightgray'} direction={'flex-start'} align={'center'} display={{base: 'flex', md: 'none'}}>
                        <Link as={RouterLink} to={`/${userProfile.username}`}>
                            <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                        </Link>
                        <Flex direction={'column'}>
                            <Box >
                                <Link as={RouterLink} fontWeight={'bold'} style={{textDecoration: 'none'}}>{userProfile.username}</Link>
                            </Box>
                            <Link as={RouterLink} fontSize={14}>{post.location}</Link>
                        </Flex>
                    </Flex>
                    
                    <Flex justify={'center'} align={'center'} flexDirection={'column'}>
                        {/* Image display */}
                        <Flex direction={{ base: 'column', md:'row'}} w={{base: '90%', sm: '70%', md:'full'}}>
                            <Flex flex={1.5}>
                                <Image 
                                src={post.photoURL} 
                                name={userProfile.username}
                                objectFit={'cover'}
                                aspectRatio={4/5}
                                // maxH={700} 
                                w={"100%"}
                                h={'auto'}
                                ></Image>
                            </Flex>
                            {/* For medium screen and up user info display */}
                            <Flex direction={'column'} w={'1fr'} backgroundColor={'white'} flex={1} >
                                <Flex borderBottom={'1px solid lightgray'} direction={'flex-start'} align={'center'} display={{base: 'none', md: 'flex'}}>
                                    <Link as={RouterLink} to={`/${userProfile.username}`}>
                                        <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                                    </Link>
                                    <Flex direction={'column'}>
                                        <Box >
                                            <Link as={RouterLink} fontWeight={'bold'} to={`/${userProfile.username}`}style={{textDecoration: 'none'}}>{userProfile.username}</Link>
                                        </Box>
                                        <Link as={RouterLink} fontSize={14}>{post.location}</Link>
                                    </Flex>
                                </Flex>
                                <Flex mt={2} display={'flex'}>
                                    <Box>
                                        <Link as={RouterLink} to={`/${userProfile.username}`}>
                                            <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                                        </Link>
                                    </Box>
                                    <Flex direction={'column'} mt={2} flex={1}>
                                        <Text>
                                        <span><Link as={RouterLink} to={`/${userProfile.username}`} fontWeight={'bold'} style={{textDecoration: 'none'}} mr={2}>{userProfile.username}</Link></span>
                                        <span fontSize={14}> {post.caption} </span>
                                        </Text>
                                        <Box color={'gray'} fontSize={12} >
                                        {timeAgo(post.createdAt)}
                                        </Box>
                                    </Flex>
                                    
                                </Flex>
                                <Divider display={{base: 'block', md: 'none'}}/>
                                <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
                                   {!isFetchingComments && comments.map((comment) => <Comment key={comment.commentId} comment={comment}/>)}
                                </VStack>
                                <Flex direction={'column'} mt={'auto'} >
                                <Flex justify={'space-between'}>    
                                        <Flex gap={3} ml={4} mb={3}>
        
                                            
                                            <Tooltip label='Like' fontSize='md'>
                                                <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={likePostHandler}>{isLiked ? <UnlikeLogo /> : <FaRegHeart />}</Box>
                                            </Tooltip> 
    
                                            {post?.likes?.length > 0 ? <Text fontWeight={'bold'}>{post?.likes?.length}</Text> : null}
        
                                            { authUser ? <Tooltip label='Comment' fontSize='md'>
                                                <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => commentInputRef.current.focus()}><CommentLogo/></Box>
                                            </Tooltip> : <Tooltip label='Comment' fontSize='md'>
                                                <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => toast("Info", "You need to log in to comment", "info")}><CommentLogo/></Box>
                                            </Tooltip>}
    
                                            <Text fontWeight={'bold'}>{comments?.length}</Text>
                                            
                                            {/* <Link as={RouterLink} fontSize={24} fontWeight={'bolder'}><LuSend/></Link> */}
    
        
                                        </Flex>
                                        {authUser?.uid === userProfile?.uid ?                                    
                                             <Tooltip label='Delete' fontSize='md'>
                                                <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={deleteUserPostHandler}><RiDeleteBin6Line /></Box>
                                            </Tooltip> : null}
                                        {/* <Box>
                                            <Link as={RouterLink} fontSize={26} fontWeight={'bolder'}><MdOutlineBookmarkBorder /></Link>
                                        </Box> */}
                                    </Flex>
                                    {/* <Box pt={2} fontWeight={'bold'} ml={4}>
                                        {post.likes.length} likes
                                    </Box> */}
                                    <Box color={'gray'} fontSize={12} ml={4}>
                                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </Box>
        
        
                                    {authUser &&  <InputGroup mb={4}>
                                        <InputLeftAddon backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} fontSize={20}><GoSmiley/></InputLeftAddon>
                                        <Input variant={'flushed'} placeholder='Add a comment...' value={commentInput} onChange={(e) => setCommentInput(e.target.value)} ref={commentInputRef}></Input>
                                        <InputRightAddon fontSize={14} backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
                                    </InputGroup> }
        
                                </Flex> 
                                   
                            </Flex> 
                        </Flex>
                    </Flex>
                    
                  </ModalBody>
                </ModalContent>
              </Modal>
              </>
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    :
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

