import Navbar from './components/Navbar';
import { Routes , Route , Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import {Loader} from 'lucide-react'; 
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from 'react-hot-toast';

import { useThemeStore } from './store/useThemeStore';

function App() {

  const { authUser , checkAuth , isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-20  animate-spin"/>
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={ authUser ? <HomePage/> : <Navigate to="/login" /> } />
        <Route path="/signup" element={ !authUser ? <SignupPage/> : <Navigate to="/" /> } />
        <Route path="/login" element={ !authUser ? <LoginPage/> : <Navigate to="/" /> } />
        <Route path="/settings" element={ authUser ? <SettingsPage/> : <Navigate to="/login" /> } />
        <Route path="/profile" element={ authUser ? <ProfilePage/> : <Navigate to="/login" /> } />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
