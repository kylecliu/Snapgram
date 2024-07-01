import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'
import useDisplayToast from '../../hooks/useDisplayToast'
import useFacebookSignIn from '../../hooks/useFacebookAuth'
import { FaFacebook } from "react-icons/fa";

const FacebookAuth = () => {

  const { facebookSignIn, error } = useFacebookSignIn();

  const toast = useDisplayToast();

  return (
    <HStack>
        <FaFacebook fontSize={20} backgroundColor='#316FF6'/>
        {/* <Image src='public/google.png' h='20px' alt='google icon'></Image> */}
        {error && toast("Error", error.message, 'error')}
        <Text 
        fontSize='sm' 
        color='gray' 
        cursor={'pointer'} 
        onClick={facebookSignIn}>
          Log in with Facebook
          </Text>
    </HStack>
  )
}

export default FacebookAuth
