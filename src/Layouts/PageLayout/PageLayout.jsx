import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import Bottombar from '../../components/Sidebar/Bottombar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SignupPrompt from '../../components/SignupPrompt/SignupPrompt';
import { auth } from '../../firebase/firebase';

 
const PageLayout = ({children}) => {

  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const isAuthenticating = !user && loading
  const canShowSidebar = location.pathname !== '/auth' && user;
  const canShowSignupPrompt = location.pathname !== '/auth' && !user

  if (isAuthenticating) {

    return <PageLoading />

  }
    
  return (
    <Flex>
        {/* signup prompt shows when no user is logged in*/}
        {canShowSignupPrompt ? <SignupPrompt /> : null }

        {canShowSidebar ?  (
          
          <>
          {/* sidebar or bottombar */}
            <Box w={{ base:"auto", lg: "240px"}} display={{base: 'none', sm:'block'}}>
              <Sidebar />
            </Box>
            <Box display={{base:'block', sm: 'none'}}>
              <Bottombar />
            </Box>
        </>) : null}

        {/* page content */}
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