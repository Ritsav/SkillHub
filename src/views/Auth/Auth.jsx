// AuthPage.jsx
import React from 'react';
import { Flex, Image, VStack, IconButton, Link as ChakraLink } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import AuthForm from '../../components/AuthForm/AuthForm';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Auth = () => {
  return (
    <div>
      <ChakraLink as={Link} to="/" marginLeft="2"   marginBottom="2" alignSelf="flex-start">
          <IconButton backgroundColor={"#FFFFFF"} marginTop={"2px"} icon={<ArrowBackIcon />} aria-label="Back to Home" size="sm" />
        </ChakraLink>
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={{ base: '1rem', md: '1rem' }}
      >
        

        <VStack spacing={4} align="center" maxW="400px" w="100%">
          {/* AuthForm Component */}
          <AuthForm />
        </VStack>
      </Flex>
    </div>
  );
};

export default Auth;
