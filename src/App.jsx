import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';


const App = () => {
  return (
    <div>
        <PageLayout>
          <Routes>
            <Route path='/'>
              <Route path='index' element= {<HomePage />} />
              <Route path='auth' element= {<AuthPage />} />
              <Route path='profile' element= {<ProfilePage />} />
            </Route> 
          </Routes>
        </PageLayout>
    </div>
  )
}

export default App;
