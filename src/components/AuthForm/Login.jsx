import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'

const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password:''
       });

    const { logIn, loading, error } = useLogin();

  return (
    <>
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
        
        {error &&  <Alert maxW='300px' status='error'>
        <AlertIcon />
        {error.message}
        </Alert>}

        <Button 
            w={'100%'}  
            mt={4}
            colorScheme='blue' 
            size='lg'
            isLoading={loading}
            onClick={() => logIn(inputs)} 
            >Log In</Button>
    </>
  )
}

export default Login
