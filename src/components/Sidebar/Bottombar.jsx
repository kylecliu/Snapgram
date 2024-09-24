import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import SidebarItems from './SidebarItems';


const Bottombar = () => {

    const bg = useColorModeValue('white', 'black')

    return (
        <Flex w={'100%'} position={'fixed'} bottom={0} bgColor={bg} justify={'center'} align={'center'} zIndex={2} h={'50px'}>
            <SidebarItems/>
        </Flex>
    )

}

export default Bottombar
