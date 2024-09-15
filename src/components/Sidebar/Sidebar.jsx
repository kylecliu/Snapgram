import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SnapgramMobileLogo, LogoutLogo, SnapgramLogo } from '../../assets/constants';
import useLogout from '../../hooks/useLogout';
import SidebarItems from './SidebarItems';



const Sidebar = () => {

    const { logOutHandler } = useLogout();

  return (
    <>
    <Flex padding={'10px 12px 20px 20px'} h={'100vh'} w={{base:"auto", lg: "240px"}} position={'fixed'} borderRight={'1px solid black'} flexDirection='column' display={{base: 'none', sm: 'flex'}}>
        <Flex align={'center'} justify={{base: 'center', lg:'flex-start'}}>
            {/* Icon a bigger screen */}
            <Link to={'/'} as={RouterLink} display={ {base: 'none', lg: 'block'}} my={5} cursor={'pointer'}>
                <SnapgramLogo />
            </Link>
            {/* Icon on a small screen */}
            <Link to={'/'} as={RouterLink} display={ {md: 'block', lg: 'none'}} px={2} py={4} cursor={'pointer'}>
                <SnapgramMobileLogo />
            </Link>
        </Flex>
        <Flex h={'100vh'} justify={'flex-start'} align={{base:'center', md: 'flex-start'}} flexDirection='column' w={"100%"}>
            <SidebarItems/>
        </Flex>
        <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} cursor={'pointer'} onClick={() => logOutHandler()}>
            <HStack p={2} borderRadius={4}>
                <Box>
                    <LogoutLogo />  
                </Box>
                <Text display={{base:'none', lg:'inline'}}>Log Out</Text>
            </HStack>
        </Flex> 
    </Flex>

    {/* As the above Flex has been taken out of flow with its position being "fixed", so adding this empty flexbox to retain its place for other elements to stay in the desired position,  */}
    <Flex padding={'10px 12px 20px 20px'} h={'100vh'} w={ {base:"50px", lg: "240px"}} flexDirection='column' display={{base: 'none', sm: 'flex'}}></Flex>

    </>
    

    

  )
}

export default Sidebar
