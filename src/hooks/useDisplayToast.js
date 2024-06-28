import React from 'react'
import { useToast } from '@chakra-ui/react'

const useDisplayToast = () => {

  const toast = useToast()

  const displayToast = (title, description, type) => {
    toast({
      title: title,
      description: description,
      status: type,
      duration: 3000,
      isClosable: true,
      position: 'top'
    })
  }

  return displayToast
}

export default useDisplayToast

