import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import useDisplayToast from '../../hooks/useDisplayToast';
import useEditProfile from '../../hooks/useEditProfile';
import usePreviewImage from '../../hooks/usePreviewImage';
import useAuthStore from '../../store/AuthStore';


  const EditPage = ({isOpen, onClose}) => {

    const [inputs, setInputs] = useState({
      username: "",
      fullName: "",
      bio: "",
      profileURL: ""
    })
    const user = useAuthStore(state => state.user)
    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImage()
    const { isLoading, editProfile } = useEditProfile()
    const toast = useDisplayToast();
    const editProfileHandler = async() => {

      try {

        await editProfile(inputs, selectedFile)
        setSelectedFile(null);
        onClose();

      } catch(error) {

        toast("Error", error.message, "error")
      }

      
      
    }

    const ref = useRef(null)


    return (

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('gray.50', 'gray.800')} rounded={'xl'}>
      <ModalCloseButton></ModalCloseButton>
        <Flex>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          p={6}
          my={6}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={selectedFile || user.profileURL}  my={2}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={() => setSelectedFile(null)}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" bg={'gray.300'} onClick={() => ref.current.click()}>Change photo</Button>
              </Center>
              <Input type='file' accept='image/png, image/gif, image/jpeg' ref={ref} hidden={true} onChange={handleImageChange}></Input>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder={user.username}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.username}
              onChange={(e) => { setInputs({...inputs, username: e.target.value})}}
            />
          </FormControl>
          <FormControl id="fullname" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder={user.fullName}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.fullName}
              onChange={(e) => { setInputs({...inputs, fullName: e.target.value})}}
            />
          </FormControl>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder={user.bio}
              _placeholder={{ color: 'gray.500' }}
              rows={2}
              value={inputs.bio}
              onChange={(e) => { setInputs({...inputs, bio: e.target.value})}}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={onClose}
              >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              isLoading={isLoading}
              onClick={() => editProfileHandler(inputs, selectedFile)}
              
              >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </ModalContent>
    </Modal>
    
  )
}

export default EditPage
