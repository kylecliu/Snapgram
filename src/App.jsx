import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import useAuthStore from './store/AuthStore';



const App = () => {

  const authUser = useAuthStore((state) => state.user);

  return (
    <div className='App'>
        <PageLayout>
          <Routes>
            <Route path='/' element= {authUser ? <HomePage /> : <Navigate to={'/auth'}/>} />
            <Route path='/auth' element= {authUser ? <Navigate to={'/'}/> : <AuthPage /> } />
            <Route path='/profile' element= {<ProfilePage />} />
          </Routes>
        </PageLayout>
    </div>
  )
}

export default App;
