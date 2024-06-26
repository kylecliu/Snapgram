import { Flex, Text, Link, Grid, GridItem, Image, Skeleton } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import ProfilePhoto from './ProfilePhoto'

const ProfilePagePhotos = () => {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(setIsLoading(false), 2000)
  }, [])

  return (
    <>

    {isloading ? (<Grid w={'70%'} gap={2} templateColumns={'repeat(3, 1fr)'} >
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>
    <GridItem><Skeleton h={300}>text</Skeleton></GridItem>

    </Grid>) : ( <Grid w={'70%'} style={{ gridTemplateColumns:'repeat(3, 1fr)'}} gap={2} my={2}>
        <ProfilePhoto name='anna' link='img1.png' location={'Paris'}></ProfilePhoto>
        <ProfilePhoto name='steve' link='img2.png' location={'New York'}></ProfilePhoto>
        <ProfilePhoto name='dolce' link='img3.png' location={'Tokyo'}></ProfilePhoto>
        <ProfilePhoto name='beach' link='img4.png' location={'Seoul'}></ProfilePhoto>
        <ProfilePhoto name='dolce' link='microsoft.png' location={'Taipei'}></ProfilePhoto>
    </Grid>)}



    {/* <Flex 
    direction='column' 
    borderTop={'1px solid black'} 
    pt={10} 
    backgroundColor={'blue'} 
    h={100} 
    w={'70%'}
    align={'center'} 
    >
        <Flex gap={20}>
            <Link as={RouterLink} style={{textDecoration: 'none'}}>POSTS</Link>
            <Link as={RouterLink} style={{textDecoration: 'none'}}>SAVED</Link>
            <Link as={RouterLink} style={{textDecoration: 'none'}}>TAGGED</Link>
        </Flex>
    </Flex> */}


    </>
  )
}

export default ProfilePagePhotos
