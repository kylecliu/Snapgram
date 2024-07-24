import React, { useRef, useState } from 'react'
import { CreatePostLogo } from '../../assets/constants'
import { Flex, Box, Text, useDisclosure, Button, Input, FormControl, Image, Textarea, CloseButton } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import usePreviewImage from '../../hooks/usePreviewImage'


const Create = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const imgRef = useRef(null)
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImage()
  const [inputs, setInputs] = useState({})

  return (
    <>
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} cursor={'pointer'}>
        <Flex  p={2} borderRadius={4} justify={'center'} onClick={onOpen}>
            <Box>
                <CreatePostLogo />
            </Box>
            <Text display={{base:'none', md:'inline'}} pl={5}>Create</Text>
        </Flex>
    </Flex>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <form >
              <FormControl>
                <Button onClick={() => imgRef.current.click()}>Select photo</Button>
                <Input type='file' visibility={'hidden'} accept='image/png, image/gif, image/jpeg' ref={imgRef} onChange={handleImageChange}></Input>
                {selectedFile ? 
                <>
                  <Flex position={'relative'}>
                    <Image src={selectedFile} alt="posting photo" /> 
                    <CloseButton bg={'white'} textColor={'black'} position={'absolute'} top={2} left={2} onClick={() => setSelectedFile(null)}/>
                  </Flex>
                </>
                : null}  

                <Textarea name="caption" placeholder='Write a caption' rows={3} value={inputs.caption} onChange={() => setInputs({...inputs, caption: inputs.caption})}/>
              </FormControl>

            </form>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} >
              Share
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>



  )
}

export default Create
