import React, { useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack } from '@chakra-ui/react'
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
import FacebookAuth from './FacebookAuth';

const AuthForm = () => {

   const [isSignedUp, setIsSignedUp] = useState(false);
   const [inputs, setInputs] = useState({
    email: '',
    password:'',
    confirmPassword:''
   });


  return (
    // Login section
    <Box>
    <Box border='2px solid gray' borderRadius={5} padding={5}>
        <VStack>
            <Image src="snapgram2.png" alt="logo" w={300} h={100} my={5}/>

            { isSignedUp ? <Login /> : <Signup />}


            {/* -------OR------- */}
            <Flex alignItems='center' justify='center' width={'100%'} my={4} gap={1}>
                <Box border={'1px solid gray'} width={'100%'}/>
                <Box>OR</Box>
                <Box border={'1px solid gray'} width={'100%'}/>
            </Flex>
            <GoogleAuth />
        </VStack>
    </Box>

            {/* Sign up or log in */}
    <Flex 
    my={2} 
    border={'2px solid gray'} 
    borderRadius={4} 
    padding={5} 
    justify={'center'} 
    align={'center'} 
    marginTop={5}
    >
        <Box mx={2} color='gray' fontSize={14}>{isSignedUp ? "Don't have an account?" : "Already have an account?" }</Box>
        <Box mx={2} color='gray' fontSize={14} cursor={'pointer'} onClick={() => setIsSignedUp(!isSignedUp)}>{isSignedUp ? "Sign Up" : "Log In"}</Box>
    </Flex>
    </Box>
  )
}

export default AuthForm
