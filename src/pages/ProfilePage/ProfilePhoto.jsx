import React from 'react'
import { Image, GridItem, Box, Flex, Link, HStack, Text, useDisclosure, Avatar, Input, InputGroup, InputLeftAddon, InputRightAddon, VStack, Tooltip } from '@chakra-ui/react'
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
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import useUserProfileStore from '../../store/ProfileStore';
import usePostStore from '../../store/postStore';
import { RiDeleteBin6Line } from "react-icons/ri";
import useAuthStore from '../../store/AuthStore';
import useDeletePost from '../../hooks/useDeletePost';






const ProfilePhoto = ({post}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const authUser = useAuthStore(state => state.user)
    const userProfile = useUserProfileStore(state => state.userProfile)
    const sameUser = authUser?.uid === userProfile.uid
    const { isDeleting, deletePostHandler }= useDeletePost()

    const deleteUserPostHandler = () => {

        if(isDeleting) return 

        if(window.confirm("Are you sure you want to delete this post?")) {

            deletePostHandler(post.id)

        } else { return }

    }



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
        // maxH={'300px'}
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
            <Flex justify={'center'}>
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
                        <Flex p={2} borderBottom={'1px solid lightgray'} direction={'flex-start'} align={'center'}>
                            <Avatar src='img1.png' name='anna' size={'sm'} m={4}></Avatar>
                            <Flex direction={'column'}>
                                <Box >
                                    <Link as={RouterLink} fontWeight={'bold'} style={{textDecoration: 'none'}}>{userProfile.username}</Link>
                                </Box>
                                <Link as={RouterLink} fontSize={14}>{post.location}</Link>
                            </Flex>
                        </Flex>
                        <Flex p={2} display={{base:'none', md:'flex'}}>
                            <Box>
                                <Avatar src='img1.png' name='anna' size={'sm'} m={4}></Avatar>
                            </Box>
                            <Flex direction={'column'} mt={2} flex={1}>
                                <Text>
                                <span><Link as={RouterLink} to={'/profile'} fontWeight={'bold'} style={{textDecoration: 'none'}} mr={2}>{userProfile.username}</Link></span>
                                <span fontSize={14}> {post.caption} </span>
                                </Text>
                                <Text fontSize={12} color={'gray'}>{post.createdAt}</Text>
                            </Flex>
                        </Flex>
                        <VStack maxH={350} overflowY={'auto'} className='comment_scroll'>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                            <Comment img='img2.png' name='steve' username={'steve'} comment={'great photo!'} time={'2w'}></Comment>
                        </VStack>
                        <Flex direction={'column'} mt={'auto'} >
                        <Flex justify={'space-between'}>
                                <Flex gap={3} ml={4}>
                                    <Link as={RouterLink} fontSize={24} fontWeight={'bolder'}><FaRegHeart /></Link>
                                    <Link as={RouterLink} fontSize={24} fontWeight={'bolder'}><FaRegComment/></Link>
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
                                {post.createdAt}
                            </Box>
                            <InputGroup mb={4}>
                                <InputLeftAddon backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} fontSize={20}><GoSmiley/></InputLeftAddon>
                                <Input variant={'flushed'} placeholder='Add a comment...'></Input>
                                <InputRightAddon fontSize={14} backgroundColor={'transparent'} border={'none'} fontWeight={'bold'} cursor={'pointer'}>Post</InputRightAddon>
                            </InputGroup>
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

