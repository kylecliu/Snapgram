import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Link, Avatar, FormHelperText } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, MessagesLogo, NotificationsLogo, ReelsLogo, SearchLogo, LogoutLogo, SnapgramLogo } from '../../assets/constants';
import SidebarItems from './SidebarItems';
import useLogout from '../../hooks/useLogout';


const Sidebar = () => {

    const { logOutHandler } = useLogout();

    const sidebarItems = [
        {   
            id: 1,
            logo: <SearchLogo />,
            title: "Home",
            route: "/"

        },
        {   
            id: 2,
            logo: <ReelsLogo />,
            title: "Reels",
            route: "/"

        },
        {   
            id: 3,
            logo: <MessagesLogo />,
            title: "Messages",
            route: "/"

        },
        {   
            id: 4,
            logo: <NotificationsLogo />,
            title: "Notifications",
            route: "/"

        },
        {   
            id: 5,
            logo: <CreatePostLogo />,
            title: "Create",
            route: "/"

        },
        {   
            id: 6,
            logo: <Avatar size='xs' name='person' src='public/img1.png' />,
            title: "Profile",
            route: "/profile"

        }
    ]

    
  return (
    <Flex padding={'10px 12px 20px 20px'} h={'100vh'} position={'sticky'} top={0} borderRight={'1px solid black'} justify={'left'} flexDirection='column'>
        <Flex h={100} align={'center'} justify={{base: 'center', md:'flex-start'}}>
            <Link to={'/index'} as={RouterLink} display={ {base: 'none', md: 'block'}} my={5} cursor={'pointer'}>
                <SnapgramLogo />
            </Link>
            <Link to={'/index'} as={RouterLink} display={ {base: 'block', md: 'none'}}  cursor={'pointer'}>
                <InstagramMobileLogo />
            </Link>
        </Flex>
        <Flex h={'100vh'} justify={'flex-start'} align={{base:'center', md: 'flex-start'}} flexDirection='column' pl={2}>

            {sidebarItems.map((item) => {
                return <SidebarItems key={item.id} logo={item.logo} title={item.title} route={item.route} _hover={{backgroundColor: "#d6dbd5"}}/>
            })}

        </Flex>
        {/* <SidebarItems logo={<LogoutLogo />} title='Log Out' onClick={() => logOutHandler()} /> */}

        <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} cursor={'pointer'} onClick={() => logOutHandler()}>
            <HStack py={4} pl={2} pr={2} borderRadius={4} >
                <Box  px={'2px'} mr={2}>
                    <LogoutLogo />
                </Box>
                <Text display={{base:'none', md:'inline'}}>Log Out</Text>
            </HStack>
        </Flex>
        
    </Flex>

  )
}

export default Sidebar
