import { Flex } from '@chakra-ui/react';
import React from 'react';
import SidebarItems from './SidebarItems';

const Bottombar = () => {


    return (
        <Flex w={'100%'} position={'fixed'} bottom={0} justify={'center'} align={'center'} bgColor={'white'} zIndex={1} h={'50px'}>
            {/* <GrHomeRounded fontSize={24}/>
            <SearchLogo />
            <CreatePostLogo />
            <Box >
                <Avatar size='xs' name='photo' src={authUser?.profileURL || ""} />
            </Box> */}
            <SidebarItems/>

        </Flex>
    )

}

export default Bottombar
