import React from 'react'
import { Flex, Button, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { SnapgramLogo } from '../../assets/constants'

const SignupPrompt = () => {

    const redirect = (route) => {
        return <Navigate to={route}/>
    }

  return (
    <Flex h={'60px'} w={'100%'} borderBottom={"1px solid #e7eaf6"} position={'fixed'} backgroundColor={'white'} zIndex={1} justify={'center'}>
        <Flex w={'35%'} justify={'flex-start'} align={'center'}>
            <SnapgramLogo />
        </Flex>
        <Flex w={'35%'} gap={4} justify={'flex-end'} align={'center'}>        
            <Button 
            backgroundColor={'#0095F6'} 
            color={'white'} 
            size={'sm'} 
            _hover={{backgroundColor:'#0189e3'}}
            ><Link
            as={RouterLink}
            to={'/auth'}
            style={{textDecoration:'none'}}
            >Log In</Link></Button>
            <Button 
            size={'sm'} 
            variant={'link'} 
            color={'#0095F6'} 
            style={{textDecoration: 'none'}} 
            _hover={{color:'black'}} 
            ><Link
            as={RouterLink}
            to={'/auth'}
            style={{textDecoration:'none'}}
            >Sign Up</Link></Button>
        </Flex>


    </Flex>
  )
}

export default SignupPrompt
