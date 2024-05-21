import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; 
import GoogleIcon from '../../assets/GoogleIcon.svg';
import { auth, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '../../firebase/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [user, setUser] = useState(null);
  const isBasicInfo = false;

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        navigate('/feed');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleMode = () => {
    setIsRegisterMode((prevMode) => !prevMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAuthAction = async () => {
    try {
      if (isRegisterMode) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid; // Access user ID

        const usersCollectionRef = collection(firestore, 'users');
        const userRef = doc(usersCollectionRef, userId);
        const userData = {
          email,
          firstName,
          lastName,
          isBasicInfo,
        };
        await setDoc(userRef, userData);

        showAlert('User registered successfully!', 'success');
        location.reload()
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const usersCollectionRef = collection(firestore, 'users');
        const userQuery = query(usersCollectionRef, where('email', '==', user.email));
        const userQuerySnapshot = await getDocs(userQuery);
        showAlert(`Welcome back, ${user.displayName}!`, 'success');
        if (userQuerySnapshot.docs.length > 0) {
          const userData = userQuerySnapshot.docs[0].data();
          navigate('/feed', { state: { user: userData } });
        } else {
          console.log('No user found with the given email');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      showAlert('Error during authentication. Please check your email address and password.', 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersCollectionRef = collection(firestore, 'users');
      const userQuery = await getDocs(query(usersCollectionRef, where('email', '==', user.email)));

      if (userQuery.docs.length === 0) {
        await addDoc(usersCollectionRef, {
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1] || '',
          email: user.email,
          isBasicInfo: isBasicInfo,
        });
      }

      showAlert('Signed in with Google successfully!', 'success');
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      showAlert('Error during Google Sign-In. Please try again.', 'error');
    }
  };

  return (
    <VStack spacing={6} align="stretch" w="100%" maxW="400px" mx="auto">
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={6} align="stretch">
          {alertMessage && (
            <Alert status={alertType} variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
              <AlertIcon boxSize="40px" mr={0} />
              {alertMessage}
            </Alert>
          )}

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button h="1.75rem" size="sm" backgroundColor="#FFFFFF" onClick={togglePasswordVisibility}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {isRegisterMode && (
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button h="1.75rem" size="sm" backgroundColor="#FFFFFF" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          )}

          <Button
            backgroundColor="#1C50C8"
            color="#FFFFFF"
            size="lg"
            onClick={handleAuthAction}
            _hover={{ bg: '#0E3C8B' }}
          >
            {isRegisterMode ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button variant="link" onClick={toggleMode} fontWeight="medium">
            {isRegisterMode ? 'Already Signed Up? Login' : 'Not Registered Yet? Sign Up Now'}
          </Button>

          <Button
            background="#FFFFF"
            color="#1A1110"
            size="lg"
            border="1px solid lightgray"
            fontWeight="regular"
            leftIcon={<img src={GoogleIcon} alt="Google Icon" style={{ height: '20px' }} />}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AuthForm;
