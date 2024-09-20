import { Box, Button, CloseButton, Flex, FormControl, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import React, { useRef, useState } from 'react'
import { firestore } from '../../firebase/firebase'
import useDisplayToast from '../../hooks/useDisplayToast'
import usePreviewImage from '../../hooks/usePreviewImage'
import useAuthStore from '../../store/AuthStore'
import useUserProfileStore from '../../store/ProfileStore'
import usePostStore from '../../store/postStore'
import { CgAddR } from "react-icons/cg";



const Create = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const imgRef = useRef(null)
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImage()
  const [inputs, setInputs] = useState({
    location: "",
    caption: ""
  })
  const { isLoading, createPostHandler }= useCreatePost()
  const addPostHandler = (inputs, selectedFile) => {

    if(isLoading) return

    createPostHandler(inputs.caption, inputs.location, selectedFile)

    onClose()
    setInputs({ 
      location: "",
      caption: ""})
    setSelectedFile(null)

  }

  return (
    <>

    <Flex _hover={{backgroundColor: "#e7eaf6"}} w={'100%'} borderRadius={5} my={2} cursor={'pointer'} justify={{base: 'center', sm: 'flex-start'}}>
        <Flex  p={2} borderRadius={4} justify={'center'} onClick={onOpen}>
            <Box>
              <CgAddR fontSize={24}/>
            </Box>
            <Text display={{base:'none', lg:'inline'}} pl={5}>Create</Text>
        </Flex>
    </Flex>

    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent rounded={'xl'}>
          <ModalHeader><Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Create Post
          </Heading></ModalHeader>
          <ModalCloseButton onClick={() => setSelectedFile(null)}/>
          <ModalBody>

            <form >
              <FormControl>
                <Button onClick={() => imgRef.current.click()}>Select photo</Button>
                <Input type='file' visibility={'hidden'} accept='image/png, image/gif, image/jpeg' ref={imgRef} onChange={handleImageChange}></Input>
                {selectedFile ? 
                <>
                  <Flex position={'relative'} mb={2}>
                    <Image src={selectedFile} alt="posting photo" /> 
                    <CloseButton bg={'white'} textColor={'black'} position={'absolute'} top={2} right={2} onClick={() => setSelectedFile(null)}/>
                  </Flex>
                </>
                : null}  
                <Input placeholder='Location' value={inputs.location} onChange={(e) => setInputs({...inputs, location: e.target.value})} mb={2}></Input>
                <Textarea name="caption" placeholder='Write a caption' rows={3} value={inputs.caption} onChange={(e) => setInputs({...inputs, caption: e.target.value})}/>
              </FormControl>

            </form>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} isLoading={isLoading} onClick={() => addPostHandler(inputs, selectedFile)} >
              Share
            </Button>
            <Button variant='ghost' onClick={() => {onClose(); setSelectedFile(null)}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>



  )
}

export default Create



const useCreatePost = () => {

  const [isLoading, setIsLoading] = useState(false)
  const toast = useDisplayToast()
  const userProfile = useUserProfileStore(state => state.userProfile)
  const addPost = useUserProfileStore(state => state.addPost) 
  const createPost = usePostStore(state => state.createPost)
  const authUser = useAuthStore(state => state.user)
  const setAuthUser = useAuthStore(state => state.setUser)

  const createPostHandler= async(caption, location, selectedFile) => {

    setIsLoading(true)

    if(!selectedFile) {

      toast('error', "You must select a photo", "Error")
      
      return
    }

    try{


    const newPost = {

      photoURL: "",
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      location: location,
      createdBy: authUser.uid,
      profileURL: authUser.profileURL,
      username: authUser.username

    } 

    const postDocRef = await addDoc(collection(firestore, "posts"), newPost)
    const userDocRef = doc(firestore, "users", authUser.uid)

    //Update storage
    const storage = getStorage();
    const imageRef = ref(storage, `photos/${postDocRef.id}`);

    await uploadString(imageRef, selectedFile, 'data_url')

    const photoURL = await getDownloadURL(imageRef)

    //update posts collection

    await updateDoc(postDocRef, {photoURL: photoURL})

    newPost.photoURL = photoURL

    //update userProfile 

    await updateDoc(userDocRef,{posts: arrayUnion(postDocRef.id)})

    //If authUser is on their own profile page, update the userprofile and post store

    { authUser.uid === userProfile?.uid ?  addPost({...newPost, id: postDocRef.id}) : null }

    { authUser.uid === userProfile?.uid ?  createPost({...newPost, id: postDocRef.id}) : null }

    //Update authUser 

    setAuthUser({...authUser, posts: [...authUser.posts, postDocRef.id]})

    toast("Success", "Post added successfully", "success")
    
    } catch(error) {

      toast("Error", error.message, 'error')

    } finally {

      setIsLoading(false)
    }

  }

  return {isLoading, createPostHandler }

}
