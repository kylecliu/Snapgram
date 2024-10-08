import { Box, Button, ButtonGroup, Flex, FormControl, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import useSearchUser from '../../hooks/useSearchUser';
import useAuthStore from '../../store/AuthStore';
import User from '../User/User';



const Search = () => {

  const {isOpen, onOpen, onClose} = useDisclosure()
  const {isFetching, user, searchUser, setUser} = useSearchUser()
  const searchRef = useRef(null)
  const authUser = useAuthStore(state => state.user)
  const submitHandler = (e) => {

    e.preventDefault()
    searchUser(searchRef.current.value)
  
  }

  const closeHandler = () => {
    onClose()
    setUser(null)
  }
 

  return (
    <>
    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} onClick={onOpen} cursor={'pointer'} justify={{base: 'center', sm: 'flex-start'}}>
        <Flex  p={2} borderRadius={4} justify={'center'}>
            <Box >
                <FiSearch fontSize={24}/>
            </Box>
            <Text display={{base:'none', lg:'inline'}} pl={5}>Search</Text>
        </Flex>
    </Flex>
     <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent rounded={'xl'}>
          <ModalHeader> <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Search User
          </Heading></ModalHeader>
          <ModalCloseButton onClick={(closeHandler)}/>
          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl>
                <Input placeholder={authUser?.username} ref={searchRef} mb={5}></Input>
              </FormControl>

              <ButtonGroup mb={2}>
                <Button colorScheme='blue' mr={3} isLoading={isFetching} type={'submit'} >Search</Button>
                <Button variant='ghost' onClick={closeHandler}>Close</Button>
              </ButtonGroup>
            </form>
            
            {user && <User user={user} setUser={setUser} onClose={onClose}/>}

          </ModalBody>
          <ModalFooter></ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

export default Search

