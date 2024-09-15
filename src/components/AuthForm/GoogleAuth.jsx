import { HStack, Image, Text } from '@chakra-ui/react'
import React from 'react'
import useGoogleSignIn from '../../hooks/useGoogleAuth'

const GoogleAuth = () => {

  const { googleSignIn } = useGoogleSignIn();

  return (
    <HStack>
        <Image src='public/google.png' h='20px' alt='google icon'></Image>
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
