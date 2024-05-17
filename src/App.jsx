import React from 'react';
import {Route, Routes } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import Auth from './views/Auth/Auth';
import Feed from './views/Feed/feed';
import CreatePitch from './views/Pitch/CreatePitch/CreatePitch';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/create-business-profile' element={<CreatePitch />} />
    
  

      
   
    </Routes>
    
    </>
  );
}

export default App;
