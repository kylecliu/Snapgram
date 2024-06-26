import { useState } from 'react'
import React from 'react'
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import { GrFormViewHide } from "react-icons/gr";
import { BiShowAlt } from "react-icons/bi";

const Signup = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password:'',
        fullName: '',
        username: ''
       });
    
    const [hidePassword, setHidePassword] = useState(false);

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
            type={ hidePassword ? 'text' : 'password' }
            placeholder='Password'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
            <InputRightElement onClick={() => {setHidePassword(!hidePassword)}}>
                { hidePassword ? <GrFormViewHide /> : <BiShowAlt/>}
            </InputRightElement>
        </InputGroup>
    
        <Button 
            colorScheme='blue' 
            size='lg'
            onClick={() => {}}
            >Sign Up</Button>
    </>
  )
}

export default Signup
