import React, { useRef, useState, useEffect } from 'react'
import { Image, GridItem, Box, Flex, Link, HStack, Text, useDisclosure, Avatar, Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, Tooltip, Divider } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'
import { FaComment, FaRegComment } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import Comment from '../../components/Comment/Comment';
import {
    Modal,
    ModalOverlay,    
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { RiDeleteBin6Line } from "react-icons/ri";
import useAuthStore from '../../store/AuthStore';
import useDeletePost from '../../hooks/useDeletePost';
import useAddComment from '../../hooks/useAddComment';
import { UnlikeLogo } from '../../assets/constants';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';



const ProfilePhoto = ({post, userProfile}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const authUser = useAuthStore(state => state.user)
    console.log("authUser")
    console.log(authUser)
    const sameUser = authUser?.uid === userProfile.uid
    const { isDeleting, deletePostHandler }= useDeletePost()
    const { isUpdating, addComment } = useAddComment()
    const [ comment, setComment ] = useState("")
    const commentRef = useRef()
    const { isLiked, checkIsLiked, likePost, isLoading }= useLikePost()
    const addCommentHandler = () => {

        if(isUpdating) return

        addComment(post.id, comment)
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

    useEffect(() => {//To check isLiked on the first render 

        checkIsLiked(post)

    }, [])


  return (
    <>
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
          <ModalBody backgroundColor='white'>
            <Flex borderBottom={'1px solid lightgray'} direction={'flex-start'} align={'center'} display={{base: 'flex', md: 'none'}}>
                <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                <Flex direction={'column'}>
                    <Box >
                        <Link as={RouterLink} fontWeight={'bold'} style={{textDecoration: 'none'}}>{userProfile.username}</Link>
                    </Box>
                    <Link as={RouterLink} fontSize={14}>{post.location}</Link>
                </Flex>
            </Flex>
            <Flex justify={'center'} align={'center'} flexDirection={'column'}>
                <Flex direction={{ base: 'column', md:'row'}} w={{base: '90%', sm: '70%', md:'full'}}>
                    <Box flex={1.5}>
                        <Image 
                        src={post.photoURL} 
                        name={userProfile.username}
                        objectFit={'cover'}
                        aspectRatio={4/5}
                        maxH={700} 
                        ></Image>
                    </Box>
                    <Flex direction={'column'} w={'1fr'} backgroundColor={'white'} flex={1} >
                        <Flex borderBottom={'1px solid lightgray'} direction={'flex-start'} align={'center'} display={{base: 'none', md: 'flex'}}>
                            <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                            <Flex direction={'column'}>
                                <Box >
                                    <Link as={RouterLink} fontWeight={'bold'} style={{textDecoration: 'none'}}>{userProfile.username}</Link>
                                </Box>
                                <Link as={RouterLink} fontSize={14}>{post.location}</Link>
                            </Flex>
                        </Flex>
                        <Flex mt={2} display={'flex'}>
                            <Box>
                                <Avatar src={userProfile.profileURL} name={userProfile.username} size={'sm'} m={4}></Avatar>
                            </Box>
                            <Flex direction={'column'} mt={2} flex={1}>
                                <Text>
                                <span><Link as={RouterLink} to={'/profile'} fontWeight={'bold'} style={{textDecoration: 'none'}} mr={2}>{userProfile.username}</Link></span>
                                <span fontSize={14}> {post.caption} </span>
                                </Text>
                            </Flex>
                        </Flex>
                        <Divider display={{base: 'block', md: 'none'}}/>
                        <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
                           { post.comments.map((comment) => <Comment comment={comment}/>)}
                        </VStack>
                        <Flex direction={'column'} mt={'auto'} >
                        <Flex justify={'space-between'}>    
                                <Flex gap={3} ml={4}>

                                    { authUser && isLiked ?
                                    <Tooltip label='Like' fontSize='md'>
                                        <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={likePostHandler}><UnlikeLogo /></Box>
                                    </Tooltip> :   <Tooltip label='Like' fontSize='md'>
                                        <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={likePostHandler}><FaRegHeart /></Box>
                                    </Tooltip>} 

                                    <Tooltip label='Comment' fontSize='md'>
                                        <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={() => commentRef.current.focus()}><FaRegComment/></Box>
                                    </Tooltip>
                                    
                                    <Link as={RouterLink} fontSize={24} fontWeight={'bolder'}><LuSend/></Link>
                                    {sameUser ?                                    
                                     <Tooltip label='Delete' fontSize='md'>
                                        <Box fontSize={24} fontWeight={'bolder'} cursor={'pointer'} onClick={deleteUserPostHandler}><RiDeleteBin6Line /></Box>
                                    </Tooltip> : null}

                                </Flex>
                                <Box>
                                    <Link as={RouterLink} fontSize={26} fontWeight={'bolder'}><MdOutlineBookmarkBorder /></Link>
                                </Box>
                            </Flex>
                            <Box pt={2} fontWeight={'bold'} ml={4}>
                                {post.likes.length} likes
                            </Box>
                            <Box color={'gray'} fontSize={12} ml={4}>
                                {timeAgo(post.createdAt)}
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

    </>
  )
}

export default ProfilePhoto

// photoURL: "",
//       caption: caption,
//       likes: [],
//       comments: [],
//       createdAt: Date.now(),
//       location: location,
//       createdBy: authUser.uid

