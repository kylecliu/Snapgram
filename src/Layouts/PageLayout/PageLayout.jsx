import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Box, Image, Flex, HStack, VStack } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';

const PageLayout = ({children}) => {
    
  const location = useLocation();

  return (
    <Flex>
        {/* {sidebar on the left} */}
        {location.pathname !== '/auth' ?  (<Box w={{base: "70px", md: "240px"}}>
            <Sidebar />
        </Box>) : null}

        {/* page content on the right */}
        <Box flex={1}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout
