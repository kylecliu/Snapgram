import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Link, Avatar, FormHelperText } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, MessagesLogo, NotificationsLogo, ReelsLogo, SearchLogo, LogoutLogo, SnapgramLogo } from '../../assets/constants';
import SidebarItems from './SidebarItems';
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/AuthStore';



const Sidebar = () => {

    const { logOutHandler } = useLogout();

    const user = useAuthStore(state => state.user) 

    // const user = JSON.parse(localStorage.getItem('user-info'))


  return (
    <Flex padding={'10px 12px 20px 20px'} h={'100vh'} position={'sticky'} top={0} borderRight={'1px solid black'} justify={'left'} flexDirection='column'>
        <Flex h={100} align={'center'} justify={{base: 'center', md:'flex-start'}}>
            <Link to={'/'} as={RouterLink} display={ {base: 'none', md: 'block'}} my={5} cursor={'pointer'}>
                <SnapgramLogo />
            </Link>
            <Link to={'/'} as={RouterLink} display={ {base: 'block', md: 'none'}}  cursor={'pointer'}>
                <InstagramMobileLogo />
            </Link>
        </Flex>
        <Flex h={'100vh'} justify={'flex-start'} align={{base:'center', md: 'flex-start'}} flexDirection='column' w={"100%"}>

            <SidebarItems/>

        </Flex>
        {/* <SidebarItems logo={<LogoutLogo />} title='Log Out' onClick={() => logOutHandler()} /> */}

        <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} cursor={'pointer'} onClick={() => logOutHandler()}>
            <HStack p={2} borderRadius={4} >
                <Box>
                    <LogoutLogo />  
                </Box>
                <Text display={{base:'none', md:'inline'}}>Log Out</Text>
            </HStack>
            
        </Flex>
        
    </Flex>

  )
}

export default Sidebar
