import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';
import LandingSvg from '../../assets/landing-vector.svg';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {auth} from '../../firebase/firebase';

const HomeView = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if(user){
    navigate('/dashboard')

  }
  return (
    <div>
      <Navbar />
      <Flex
        minH={{ base: '70vh', md: '80vh' }}
        justifyContent="center"
        alignItems="center"
        flexDirection={{ base: 'column', md: 'row' }}
        padding={{ base: '1rem', md: '2rem' }}
      >
        <Box
          flex="1"
          mb={{ base: '2rem', md: '0' }}
        >
          <Image src={LandingSvg} alt="Landing SVG" maxW={{ base: '100%', md: '80%' }} />
        </Box>

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems={{ base: 'center', md: 'flex-start' }}
          ml={{ base: 0, md: '2rem' }}
        >
          <Text fontSize={{ base: '3xl', md: '5xl' }} fontFamily="Karla" fontWeight="bold">
            Bridging Visions,
          </Text>
          <Text fontSize={{ base: '3xl', md: '5xl' }} fontFamily="Karla" fontWeight="bold">
            Fuelling Futures.
          </Text>
          <Text color="#333333" fontFamily="Karla" mt="2" fontSize={{ base: 'lg', md: 'xl' }}>
            A groundbreaking opportunity for innovators and investors to redefine the IT landscape of Nepal.
          </Text>
          <a href="/auth">
          <Button
            mt="4"
            variant="solid"
            size="lg"
            colorScheme="blue"
            fontFamily="Karla"
            fontWeight="bold"
            _hover={{ bg: 'blue.500' }}
          >
            Get Started
          </Button>
          </a>
          {/* Add more content or buttons as needed */}
        </Box>
      </Flex>
    </div>
  );
};

export default HomeView;
