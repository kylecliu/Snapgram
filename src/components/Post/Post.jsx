import React, { useEffect, useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Avatar, Heading, Link, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { ThreeDots, UnlikeLogo, CommentLogo, SendLogo, SaveLogo, NotificationsLogo } from '../../assets/constants';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Post = (props) => {
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  


  const likeHandler = () => {
    if (isLiked) {
        setIsLiked(!isLiked);
        setLikes(likes-1);
    } else {
        setIsLiked(!isLiked);
        setLikes(likes+1);
    }
  }


  useEffect(() => {
    setTimeout(() => {setIsLoading(false), 2000})
  }, [] ) 
  
  
  
  
    if (!isLoading) {return (

    <Flex pt={10} w={'468px'} direction={'column'} mx={10}>
   <Flex py={2} justify={"space-between"}>
       <Flex >
       <Avatar src={props.avatar} mr={2} />
       <Flex direction={'column'}>
           <Flex justify='flex-start' align={'center'}>
               <Link as={RouterLink} to={'/index'} fontWeight='bold' style={{textDecoration: 'none'}} > {props.username} </Link >
               <Text fontSize='sm'> •10h </Text>
           </Flex>
           <Flex justify='flex-start' align={'center'}>
               <Link as={RouterLink} to={'/index'}/> <Text fontSize='sm' style={{textDecoration: 'none'}}>{props.location}</ Text><Link />
           </Flex>
       </Flex>
       </Flex>
       <Box>
           <ThreeDots />
       </Box>
   </Flex>
   <Image src={props.photo}  borderRadius={4} aspectRatio={3/4} objectFit={'cover'} maxH={600}></Image>
   <Flex my={2} direction={'row'} justify='space-between'>
       <Flex direction={'row'}>
           <Box pr={2} onClick={() => {likeHandler()}} cursor={'pointer'}> 
               {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
           </Box>
           <Link as={RouterLink } to={'/index'} pr={2} > 
               <CommentLogo />
           </Link>
           <Link as={RouterLink } to={'/index'}> 
               <SendLogo />
           </Link>
       </Flex>
       <Link as={RouterLink } to={'/index'}> 
               <SaveLogo />
       </Link>
   </Flex>
   <Heading as='h6' size='sm' mb={1}> {likes} likes</Heading>
   
   <Flex direction={'flex-start'} wrap={'wrap'}>
       <Text>
       <span ><Link as={RouterLink} to={'/index'} fontWeight={'bold'} style={{textDecoration: 'none'}}> {props.username}</Link></span>
       <span> Did you know that mussels are not only delicious, but also full of surprises? Swipe to uncover three fun facts about mussels that will leave you shell-shocked! 🐚🤯 </span>
       </Text>
       <Text color={'gray'}>view all comments</Text>
   </Flex>
   <InputGroup>
       <Input placeholder='Add a comment' size={'sm'} variant={'flushed'}></Input>
       <InputRightAddon backgroundColor={'transparent'} border={'none'} _hover={{color:'gray'}} cursor={'pointer'}>Post</InputRightAddon>
   </InputGroup>
    
</Flex>)} else {
    return (
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
}

export default Post
