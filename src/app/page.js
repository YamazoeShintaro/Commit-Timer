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
              <div className="h-screen pt-20 flex justify-center">
                <Home />
                {/* <Button
                  variant="contained"
                  type="submit"
                  style={{ width: 200, height: 55, textTransform: 'none', fontSize: 16 }}
                  onClick={handleSignOut}
                >サインアウト</Button> */}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <GoogleForm />
              </div>
            )}
        </div>
    );
}