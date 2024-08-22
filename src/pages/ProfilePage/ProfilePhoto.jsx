import React, { useRef, useState, useEffect } from 'react'
import { Image, GridItem, Box, Flex, Link, HStack, Text, useDisclosure, Avatar, Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, Tooltip, Divider } from '@chakra-ui/react'
import { Link as RouterLink, useParams} from 'react-router-dom'
import { FaComment, FaRegComment } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import Comment from '../../components/Comment/Comment';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { RiDeleteBin6Line } from "react-icons/ri";
import useAuthStore from '../../store/AuthStore';
import useDeletePost from '../../hooks/useDeletePost';
import useAddComment from '../../hooks/useAddComment';
import { UnlikeLogo } from '../../assets/constants';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import useGetComments from '../../hooks/useGetComments';
import useDisplayToast from '../../hooks/useDisplayToast';
import { CommentLogo } from '../../assets/constants';




const ProfilePhoto = ({post}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { username } = useParams();
    const { userProfile, isLoading: isLoadingUser } = useGetUserProfile(username);
    const authUser = useAuthStore(state => state.user)
    const { isDeleting, deletePostHandler }= useDeletePost()
    const { addComment } = useAddComment()
    const [ comment, setComment ] = useState("")
    const commentRef = useRef()
    const { isLiked, likePost, isLoading }= useLikePost(post)
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
    const likePostHandler = () => {

        if(isLoading) return 

        likePost(post)
    }


    console.log(`ProfilePhoto comments:  ${JSON.stringify(comments)}`)

 


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
            gap={10}
            opacity={0}
            _hover={{opacity:'1'}}
            backgroundColor='blackAlpha.500' 
            overflow={'hidden'}
            transition={'all 0.2s ease'}
            zIndex={1}
            onClick={onOpen}
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
            backgroundColor={'black'}
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
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => commentRef.current.focus()}><CommentLogo/></Box>
                                        </Tooltip> : <Tooltip label='Comment' fontSize='md'>
                                            <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => toast("Info", "You need to log in to comment", "info")}><CommentLogo/></Box>
                                        </Tooltip>}

                                        {comments?.length > 0 ? <Text fontWeight={'bold'}>{comments?.length}</Text> : null}
                                        
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
                                    <Input variant={'flushed'} placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} ref={commentRef}></Input>
                                    <InputRightAddon fontSize={14} backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} cursor={'pointer'} onClick={addCommentHandler}>Post</InputRightAddon>
                                </InputGroup> }
    
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

