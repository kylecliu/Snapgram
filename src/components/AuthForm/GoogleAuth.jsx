import React from 'react'
import { HStack, Image, Text } from '@chakra-ui/react'

const GoogleAuth = () => {
  return (
    <HStack>
        <Image src='public/google.png' h='20px' alt='google icon'></Image>
        <Text fontSize='sm' color='gray'>Login with Google</Text>
    </HStack>
  )
}

export default GoogleAuth
