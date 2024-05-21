import React, { useEffect, useState } from 'react';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../firebase/firebase';
import { auth } from "../../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import BasicInfo from '../../components/BasicInfoForm.jsx';

const Feed = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("email", "==", auth.currentUser.email)); // Query by email
        const querySnapshot = await getDocs(q);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() }); // Store document ID
        });
        const filteredUser = fetchedUsers.find(user => user.email === auth.currentUser.email);
        setUser(filteredUser);
        setUserDocId(filteredUser?.id); // Set the document ID
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser();
      } else {
        setLoading(false);
        setError("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (user && user.isBasicInfo) {
    return (
      <div>
        <AuthNavbar />
      </div>
    );
  } else {
    return (
      <BasicInfo userDocId={userDocId} onFormSubmit={() => setUser({ ...user, isBasicInfo: true })}/> // Pass the document ID and callback function
    );
  }
}

export default Feed;