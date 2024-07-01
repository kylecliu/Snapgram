import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'
import useGoogleSignIn from '../../hooks/useGoogleAuth'
import useDisplayToast from '../../hooks/useDisplayToast'

const GoogleAuth = () => {

  const { googleSignIn, error } = useGoogleSignIn();

  const toast = useDisplayToast();

  return (
    <HStack>
        <Image src='public/google.png' h='20px' alt='google icon'></Image>
        {error && toast("Error", error.message, 'error')}
        <Text 
        fontSize='sm' 
        color='gray' 
        cursor={'pointer'} 
        onClick={googleSignIn}>
          Log in with Google
          </Text>
    </HStack>
  )
}

export default GoogleAuth
