import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Box, Image, Flex, HStack, VStack, Spinner } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import SignupPrompt from '../../components/SignupPrompt/SignupPrompt';



const PageLayout = ({children}) => {

  const [user, loading] = useAuthState(auth);

  const location = useLocation();

  const canShowSidebar = location.pathname !== '/auth' && user;

  const canShowSignupPrompt = location.pathname !== '/auth' && !user

  const isAuthenticating = !user && loading

  if (isAuthenticating) {

    return <PageLoading />

  }
    

  return (
    <Flex>
        
        {canShowSignupPrompt ? <SignupPrompt /> : null }

        {/* {sidebar on the left} */}
        {canShowSidebar ?  (<Box w={{base: "70px", md: "240px"}}>
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

const PageLoading = () => {

  return (
    <Flex h={'100vh'} w={'100%'} backgroundColor={'black'} opacity={0.8} justify={'center'} align={'center'} >
        <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
    </Flex>
  )

}