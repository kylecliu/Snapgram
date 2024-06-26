import React, { useState } from 'react'
import { Flex, Container, Box, Image, VStack, Input, Button, Text, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const AuthForm = () => {

   const [isSignedUp, setIsSignedUp] = useState(true);
   const [inputs, setInputs] = useState({
    email: '',
    password:'',
    confirmPassword:''
   });
   const navigate = useNavigate();

   function handleAuth() {
    if(!inputs.email || !inputs.password) {
        window.alert("Please fill all the fields");
        return
    }
    navigate("/index");
   }


  return (
    // Login section
    <Box>
    <Box border='2px solid gray' borderRadius={5} padding={5}>
        <VStack>
            <Image src="snapgram2.png" alt="logo" w={300} h={100} my={5}/>
            <Input 
            type="email" 
            placeholder='Email'
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
            <Input 
            type="password" 
            placeholder='Password'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
            {isSignedUp ? null : 
            <Input 
            type='text' 
            placeholder='Confirm Password' 
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>}

            <Button 
            colorScheme='blue' 
            size='lg'
            onClick={() => {handleAuth()}}
            >Log In</Button>
            {/* -------OR------- */}
            <Flex alignItems='center' justify='center' width={'100%'} my={4} gap={1}>
                <Box border={'1px solid gray'} width={'100%'}/>
                <Box>OR</Box>
                <Box border={'1px solid gray'} width={'100%'}/>
            </Flex>
            <HStack>
                <Image src='public/google.png' h='20px' alt='google icon'></Image>
                <Text fontSize='sm' color='gray'>Login with Google</Text>
            </HStack>
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
        <Box mx={2} color='gray' fontSize={14}>{isSignedUp ? "Already have an account?" : "Don't have an account?"}</Box>
        <Box mx={2} color='gray' fontSize={14} cursor={'pointer'}>{isSignedUp ? "Log In" : "Sign Up"}</Box>
    </Flex>
    </Box>
  )
}

export default AuthForm
