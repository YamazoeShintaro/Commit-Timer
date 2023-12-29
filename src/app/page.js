'use client';

import Home from "@/components/Home";
import GoogleForm from '@/components/GoogleForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/FireBase';
import { Button } from '@mui/material';

export default function LoginFlow() {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {auth.signOut()}

    return (
        <div>
            {user ? (
                <Home />
            ) : (
              <div className="flex items-center justify-center">
                <GoogleForm />
              </div>
            )}
        </div>
    );
}