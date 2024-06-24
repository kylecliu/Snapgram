import React from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack, Link, Avatar } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, MessagesLogo, NotificationsLogo, ReelsLogo, SearchLogo, LogoutLogo } from '../../assets/constants';
import SidebarItems from './SidebarItems';


const Sidebar = () => {

    const sidebarItems = [
        {   
            id: 1,
            logo: <SearchLogo />,
            title: "Home",
            route: "/index"

        },
        {   
            id: 2,
            logo: <ReelsLogo />,
            title: "Reels",
            route: "/index"

        },
        {   
            id: 3,
            logo: <MessagesLogo />,
            title: "Messages",
            route: "/index"

        },
        {   
            id: 4,
            logo: <NotificationsLogo />,
            title: "Notifications",
            route: "/index"

        },
        {   
            id: 5,
            logo: <CreatePostLogo />,
            title: "Create",
            route: "/index"

        },
        {   
            id: 6,
            logo: <Avatar size='xs' name='person' src='public/img1.png' />,
            title: "Profile",
            route: "/profile"

        }
    ]

    
  return (
    <Flex padding={'8px 12px 20px 20px'} h={'100vh'} position={'sticky'} top={0} outline={'1px solid black'} justify={'left'} flexDirection='column'>
        <Link to={'/index'} as={RouterLink} display={ {base: 'none', md: 'block'}} my={10} cursor={'pointer'} pl={2}>
            <InstagramLogo />
        </Link>
        <Link to={'/index'} as={RouterLink} display={ {base: 'block', md: 'none'}} my={10} cursor={'pointer'} pl={2}>
            <InstagramMobileLogo />
        </Link>
        <Flex h={'100vh'} justify={{base: 'center', md:'flex-start'}} flexDirection='column'>

            {sidebarItems.map((item) => {
                return <SidebarItems key={item.id} logo={item.logo} title={item.title} route={item.route}/>
            })}

        </Flex>
        <SidebarItems logo={<LogoutLogo />} title='Log Out' route='/auth' />
    </Flex>

  )
}

export default Sidebar
