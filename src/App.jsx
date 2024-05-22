import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './views/Home/HomeView';
import Auth from './views/Auth/Auth';
import Feed from './views/Feed/feed';
import CreatePitch from './views/Pitch/CreatePitch/CreatePitch';
import PitchDetails from './views/Feed/PitchDisplay/PitchDetails/pitchDetails';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/create-business-profile' element={<CreatePitch />} />
        <Route path='/pitch/:id' element={<PitchDetails />} />
      </Routes>
  );
}

export default App;