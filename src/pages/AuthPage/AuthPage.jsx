import React from 'react'
import { Flex, Container, Box, Image, VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm';

const AuthPage = () => {
  return (
    <Flex minH='100vh' justify='center' align='center' px='4'>
      <Container maxW='mdcontainer.sm' padding='0' centerContent='true'>
        <Flex justify='center' align='center' gap={10}>
          {/* Left-hand side components */}
        <Box display={{base: "none", md: "block"}} margin={5}>
          <Image src='auth.png' h={650} alt='phone image'></Image>
        </Box>
        {/* Right-hand side components */}
        <Box>
        <VStack spacing={5} align={'stretch'}>
          <AuthForm />
          <Box textAlign={'center'}>Get the app. </Box>
          <Flex gap={5} justify={'center'}>
            <Image src='playstore.png' h={10} alt='playstore logo'></Image>
            <Image src='microsoft.png' h={10} alt='microsoft logo'></Image>
          </Flex>
      </VStack>
      </Box>
        </Flex>
      </Container>
    </Flex>
  )
}

export default AuthPage;
