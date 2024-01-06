'use client';

import Home from "@/components/Home";
import GoogleForm from '@/components/GoogleForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/FireBase';

export default function LoginFlow() {
    const [user] = useAuthState(auth);

    return (
        <div>
          {user ? (
            <Home />
          ) : (
            <div className="flex">
              <GoogleForm />
            </div>
          )}
        </div>
    );
}