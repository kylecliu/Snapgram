import React from 'react'
import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import useGetFollowers from '../../hooks/useGetFollowers'
import User from '../../components/User/User'
import useSearchUser from '../../hooks/useSearchUser'
import useDisplayToast from '../../hooks/useDisplayToast'
import useAuthStore from '../../store/AuthStore'

const ProfileStatistics = ({userProfile}) => {

    const { isFetching, followers, followedUsers } = useGetFollowers()
    const { isOpen: isFollowersOpen, onOpen: onFollowersOpen, onClose: onFollowersClose } = useDisclosure()
    const { isOpen: isFollowingOpen, onOpen: onFollowingOpen, onClose: onFollowingClose } = useDisclosure()
    const { setUser } = useSearchUser()
    const toast = useDisplayToast()
    const authUser = useAuthStore(state => state.user)
    
    return (
        <Flex direction={'flex-start'} gap={8} mt={4} mb={4} display={{base: 'none', md: 'none', lg:'flex'}} fontWeight={'bold'} fontSize={15}>
            <Box>{userProfile.posts.length} posts</Box>

            <Box onClick={authUser ? onFollowersOpen : () => toast("Info", "Please log in to proceed", "info")} cursor={'pointer'}>{userProfile.followers.length} followers</Box>
            <Modal isOpen={isFollowersOpen} onClose={onFollowersClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Followers</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={'column'}>
                        {isFetching || followers?.length === 0 ? null : followers.map((user) => <User key={user.uid} user={user} setUser={setUser}/>)}
                    </Flex>
                </ModalBody>
                </ModalContent>
            </Modal>

            <Box onClick={authUser ? onFollowingOpen : () => toast("Info", "Please log in to proceed", "info")} cursor={'pointer'}>{userProfile.following.length} following</Box>
            <Modal isOpen={isFollowingOpen} onClose={onFollowingClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Following</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={'column'}>
                        {isFetching || followedUsers?.length === 0 ? null : followedUsers.map((user) => <User key={user.uid} user={user} setUser={setUser}/>)}
                    </Flex>
                </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default ProfileStatistics

