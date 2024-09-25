import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import { BiShowAlt } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";

const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password:''
       });

    const { logIn, loading, error } = useLogin();
    const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
        <Input 
            type="email" 
            placeholder='Email'
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
        <InputGroup>
          <Input 
              type={ hidePassword ? 'password' : 'text' }
              placeholder='Password'
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
              />
          <InputRightElement onClick={() => {setHidePassword(!hidePassword)}}>
            { hidePassword ? <GrFormViewHide fontSize={25}/> : <BiShowAlt fontSize={25}/>}
          </InputRightElement>
        </InputGroup>
        
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
