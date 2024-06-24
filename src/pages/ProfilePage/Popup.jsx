import { Flex, Image, Avatar } from '@chakra-ui/react'
import React from 'react'

export default function Popup() {
  return (
    // <Flex 
    // maxW={'100%'} 
    // maxH={'100%'}
    // justify={'center'}
    // align={'center'}
    // zIndex={1}
    // position={'fixed'}
    // top={'20%'}
    // backgroundColor={'rgba(0,0,0,0.5)'}
    // >
    //     <Flex w={'90%'} backgroundColor={'black'} display={{sm: 'row', md:'column'}}>
    //         <Flex>
    //             <Image src='img2.png' aspectRatio={4/5} maxH={600}></Image>
    //         </Flex>
    //         <Flex direction={'column'} backgroundColor={'white'}>
    //             <Flex>
    //                 <Avatar src='img1.png' size={'sm'} name='anna'></Avatar>
    //             </Flex>
    //         </Flex>
    //     </Flex>

    // </Flex>
    function ReturnFocus() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const finalRef = React.useRef(null)
      
        return (
          <>
            <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
              Some other content that'll receive focus on close.
            </Box>
      
            <Button mt={4} onClick={onOpen}>
              Open Modal
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Lorem count={2} />
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      }
  )
}
