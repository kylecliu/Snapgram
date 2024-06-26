import { useState } from 'react'
import React from 'react'
import { Input, Button } from '@chakra-ui/react'

const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password:''
       });

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
        
        <Button 
            colorScheme='blue' 
            size='lg'
            onClick={() => {}}
            >Log In</Button>
    </>
  )
}

export default Login
