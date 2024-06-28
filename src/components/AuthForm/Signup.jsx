import { useState } from 'react'
import React from 'react'
import { Input, Button, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react'
import { GrFormViewHide } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";
import useSignInWithEmailAndPassword from '../../hooks/useSignInWithEmailAndPassword';


const Signup = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password:'',
        fullName: '',
        username: ''
       });
    
    const [hidePassword, setHidePassword] = useState(true);

    const {loading, error, signup} = useSignInWithEmailAndPassword()

  return (
    <>
        <Input 
        type="email" 
        placeholder='Email'
        value={inputs.email}
        onChange={(e) => setInputs({...inputs, email: e.target.value})}
        />
        <Input 
        type="text" 
        placeholder='Full Name'
        value={inputs.fullName}
        onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
        />
        <Input 
        type="text" 
        placeholder='Username'
        value={inputs.username}
        onChange={(e) => setInputs({...inputs, username: e.target.value})}
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
        There was an error processing your request. 
        </Alert>}
    
        <Button
            isLoading={loading}
            w={'100%'}  
            mt={4}
            colorScheme='blue' 
            size='lg'
            onClick={() => {signup(inputs)}}
            >Sign Up</Button>
    </>
  )
}

export default Signup
