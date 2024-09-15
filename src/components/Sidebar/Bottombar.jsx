import { Flex } from '@chakra-ui/react';
import React from 'react';
import SidebarItems from './SidebarItems';

const Bottombar = () => {


    return (
        <Flex w={'100%'} position={'fixed'} bottom={0} justify={'center'} align={'center'} bgColor={'white'} zIndex={1} h={'50px'}>
            <SidebarItems/>
        </Flex>
    )

}

export default Bottombar
