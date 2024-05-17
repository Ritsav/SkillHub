import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Image, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, List, ListItem, chakra } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../../assets/logo.svg';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#FFFFFF"
      color="#333333"
    >
      <Box>
        <Link to="/">
          <Image src={Logo} alt="Logo" height="24px" />
        </Link>
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <List display="flex" alignItems="center" listStyleType="none">
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/feed">Feed</Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/create-business-profile">Pitch Project</Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/newsroom">Newsroom</Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/auth">Sign In</Link>
            </chakra.div>
          </ListItem>
        </List>
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
          aria-label="Open navigation menu"
        />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Navigate</DrawerHeader>
              <DrawerBody>
                <List>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/feed" onClick={onClose}>Feed</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/create-business-profile" onClick={onClose}>Pitch Project</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/newsroom" onClick={onClose}>Newsroom</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'gray.500' }}>
                      <Link to="/auth" onClick={onClose}>Sign <Input:btn></Input:btn></Link>
                    </chakra.div>
                  </ListItem>
                </List>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
