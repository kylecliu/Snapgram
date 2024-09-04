import React, { useRef } from 'react'
import { SearchLogo } from '../../assets/constants'
import { Flex, Box, Text, useDisclosure, Button, ButtonGroup, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import useSearchUser from '../../hooks/useSearchUser';
import { FormControl } from '@chakra-ui/react'
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
                <SearchLogo />
            </Box>
            <Text display={{base:'none', lg:'inline'}} pl={5}>Search</Text>
        </Flex>
    </Flex>
     <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Users</ModalHeader>
          <ModalCloseButton onClick={closeHandler}/>
          <ModalBody>
            <form onSubmit={submitHandler}>
              <FormControl>
                <Input placeholder={authUser?.username} ref={searchRef} mb={5}></Input>
              </FormControl>

              <ButtonGroup mb={2}>

              <Button colorScheme='blue' mr={3} isLoading={isFetching} type={'submit'} >
              Search
              </Button>
              <Button variant='ghost' onClick={closeHandler}>Close</Button>
              </ButtonGroup>
            </form>
            
            {user && <User user={user} setUser={setUser}/>}

          </ModalBody>
          <ModalFooter></ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

export default Search

