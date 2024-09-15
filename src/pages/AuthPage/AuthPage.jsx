import { Box, Flex, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';

const AuthPage = () => {
  return (
    <Flex minH='100vh' justify='center' align='center'>
      <Flex justify='center' align='center' gap={10}>
        {/* Left-hand side components */}
        <Box display={{base: "none", lg: "block"}} margin={5}>
          <Image src='auth2.png' h={650} alt='phone image'></Image>
        </Box>
      {/* Right-hand side components */}
        <Box>
          <VStack spacing={5}>
            <AuthForm />
            <Box> Get the app. </Box>
            <Flex gap={5} justify={'center'}>
              <Image src='playstore.png' h={10} alt='playstore logo'></Image>
              <Image src='microsoft.png' h={10} alt='microsoft logo'></Image>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}

export default AuthPage;
