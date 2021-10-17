import '../styles/globals.css'
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'

export default function MyApp({ Component, pageProps }) {

  

  return (
    <UserContext.Provider value={{ user: {}, username: 'Eli' }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
