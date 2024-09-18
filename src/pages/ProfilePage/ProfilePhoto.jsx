import { Avatar, Box, Flex, GridItem, HStack, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FaComment, FaHeart, FaRegHeart  } from "react-icons/fa6";
import { GoSmiley } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link as RouterLink, useParams } from 'react-router-dom';
import { CommentLogo, UnlikeLogo } from '../../assets/constants';
import Comment from '../../components/Comment/Comment';
import useAddComment from '../../hooks/useAddComment';
import useDeletePost from '../../hooks/useDeletePost';
import useDisplayToast from '../../hooks/useDisplayToast';
import useGetComments from '../../hooks/useGetComments';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import useLikePost from '../../hooks/useLikePost';
import useAuthStore from '../../store/AuthStore';
import { timeAgo } from '../../utils/timeAgo';
import { TbMessageCircle } from "react-icons/tb";


const ProfilePhoto = ({post}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isCommentOpen, onOpen: onCommentOpen, onClose: onCommentClose} = useDisclosure()
    const { username } = useParams();
    const { userProfile, isLoading: isLoadingUser } = useGetUserProfile(username);
    const authUser = useAuthStore(state => state.user)
    const { isDeleting, deletePostHandler }= useDeletePost()
    const { addComment } = useAddComment()
    const [ comment, setComment ] = useState("")
    const commentRef = useRef()
    const { isLiked, likePost }= useLikePost(post)
    const {isFetchingComments, comments} = useGetComments(post)
    const toast = useDisplayToast()


    const addCommentHandler = () => {

        addComment(post.id, comment)
        setComment("")
    }

    const deleteUserPostHandler = () => {

        if(isDeleting) return

        if(window.confirm("Are you sure you want to delete this post?")) {

            deletePostHandler(post.id)

        } else { return }

    }


    return (!isLoadingUser ? <>
        <GridItem  
        cursor={'pointer'}
        position={'relative'}
        >
            {/* Overlay */}
            <Flex 
            h={'full'} 
            w={'full'} 
            position={'absolute'} 
            justify={'center'} 
            align={'center'}
            gap={{base: 2, md: 8}}
            opacity={0}
            _hover={{opacity:'1'}}
            backgroundColor='blackAlpha.500' 
            transition={'all 0.2s ease'}
            zIndex={1}
            onClick={authUser ? onOpen : () => toast("Info", "Please log in to proceed", "info")}
            >
                <HStack gap={1}>
                    <Link as={RouterLink} ><FaHeart color='white' fontSize={22} opacity={1}/></Link>
                    <Text color={'white'} fontWeight={'bold'}>{post.likes.length}</Text>  
                </HStack>
                <HStack gap={1}>
                    <Link as={RouterLink} ><FaComment color='white' fontSize={22} opacity={1}/></Link>
                    <Text color={'white'} fontWeight={'bold'}>{post.comments.length}</Text>  
                </HStack>
            </Flex>
            <Image 
            objectFit={'cover'}
            name={userProfile.username} 
            src={post.photoURL}
            aspectRatio={1/1}
            />
        </GridItem>
    
    
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
              
              <ModalBody p={0}>
                {/* Small screen user info display */}
                <Flex direction={'flex-start'} align={'center'} display={{base: 'flex', md: 'none'}}>
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
                    <Flex direction={{ base: 'column', md:'row'}}>
                        <Flex flex={1.5}>
                            <Image 
                            src={post.photoURL} 
                            name={userProfile.username}
                            objectFit={'cover'}
                            aspectRatio={4/5}
                            w={"100%"}
                            h={'auto'}
                            ></Image>
                        </Flex>
                        {/* For medium screen and up user info display */}
                        <Flex direction={'column'} flex={1} >
                            <Flex borderBottom={'1px solid lightgray'} align={'center'} display={{base: 'none', md: 'flex'}}>
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
                            <Flex mt={2}>
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

                            {/* comment section */}
                            <VStack maxH={500} overflowY={'auto'} className='comment_scroll' display={{base: 'none', sm: 'block'}}>
                               {!isFetchingComments && comments.map((comment) => <Comment key={comment.commentId} comment={comment}/>)}
                            </VStack>

                            {/* interactive tool bar */}
                            <Flex direction={'column'} mt={'auto'} >
                                <Flex justify={'space-between'}>    
                                    <Flex gap={3} ml={4} my={3}>
                                        <Tooltip label='Like' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => likePost(post)}>{isLiked ? <UnlikeLogo /> : <FaRegHeart />}</Box>
                                        </Tooltip> 

                                        {post?.likes?.length > 0 ? <Text fontWeight={'bold'}>{post?.likes?.length}</Text> : null}

                                        {/* The comment icon opens a modal on a small screen and focuses on the comment section on a larger screen and is only available when the user is logged in */}
                                        { authUser ? <>
                                        <Tooltip label='Comment' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={onCommentOpen} display={{base: 'block', sm: 'none'}}><TbMessageCircle fontSize={25}/></Box></Tooltip>
                                        <Tooltip label='Comment' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => commentRef.current.focus()} display={{base: 'none', sm: 'block'}}><TbMessageCircle fontSize={25}/></Box>
                                        </Tooltip> </> : <Tooltip label='Comment' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => toast("Info", "You need to log in to comment", "info")}><TbMessageCircle fontSize={25}/></Box>
                                        </Tooltip>}

                                        {comments?.length > 0 ? <Text fontWeight={'bold'}>{comments?.length}</Text> : null}
                                        
                                    </Flex>
                                    {authUser?.uid === userProfile?.uid ?                                    
                                         <Tooltip label='Delete' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={deleteUserPostHandler} mr={2} my={3}><RiDeleteBin6Line /></Box>
                                        </Tooltip> : null}

                                </Flex>

                                <Box color={'gray'} fontSize={12} ml={4} mb={2}>
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </Box>
    
    
                                {authUser &&  <InputGroup mb={4}>
                                    <InputLeftAddon backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} fontSize={20}><GoSmiley/></InputLeftAddon>
                                    <Input variant={'flushed'} placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} ref={commentRef}></Input>
                                    <InputRightAddon fontSize={14} backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
                                </InputGroup> }

                            {/* Modal for comments on a small screen */}
                            <Modal isOpen={isCommentOpen} onClose={onCommentClose}>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader>Comments</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <VStack h={'100vh'} maxH={450} overflowY={'auto'} className='comment_scroll'>
                                        {!isFetchingComments && comments.map((comment) => <Comment key={comment.commentId} comment={comment}/>)}
                                        {comments.length === 0 ? <Text>No comments yet!</Text> : null}
                                    </VStack>
                                </ModalBody>
                                <ModalFooter>
                                {authUser &&  <InputGroup mb={4}>
                                        <InputLeftAddon backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} fontSize={20}><Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'}/></InputLeftAddon>
                                        <Input variant={'flushed'} placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} ref={commentRef}></Input>
                                        <InputRightAddon fontSize={14} backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
                                    </InputGroup> }
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>     
                    </Flex> 
                </Flex>
            </Flex>        
            </ModalBody>
        </ModalContent>
        </Modal>
    
        </> : null)

}

export default ProfilePhoto

