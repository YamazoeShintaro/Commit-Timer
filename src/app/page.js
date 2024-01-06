'use client';

import Home from "@/components/Home";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/FireBase';
import GoogleSignIn from "@/components/GoogleSignIn";

export default function LoginFlow() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <Home />
      ) : (
        <GoogleSignIn />
      )}
    </div>
  );
}