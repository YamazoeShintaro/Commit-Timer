'use client';

import { auth, provider } from '@/components/FireBase';
import { Button } from '@mui/material';
import { signInWithPopup } from "firebase/auth";
import { Roboto_Slab } from 'next/font/google';

const LogoFnt = Roboto_Slab({ subsets: ['latin'] });

export default function GoogleSignIn() {
    const handleSignIn = () => {
      signInWithPopup(auth, provider);
    };

    return (
      <div className="flex">
        <div style={{ color: "#101841" }} className="flex justify-center items-center z-50 w-screen h-screen bg-slate-50 pt-12 pb-6 px-8">
          <div
            style={{ backgroundColor: "#101841",fontWeight: 300, fontSize: 24 }}
            className='py-1.5 flex justify-center items-center text-slate-50 fixed top-0 left-0 right-0 z-30'
          >
            <h1 className={LogoFnt.className}>Commit Timer</h1>
          </div>
          <div className="flex items-center justify-center h-96">
            <Button
              variant="contained"
              type="submit"
              style={{ width: 200, height: 50, textTransform: 'none', fontSize: 16, backgroundColor: "#70acce" }}
              onClick={handleSignIn}
            >Googleでサインイン</Button>
          </div>
        </div>
      </div>
    );
  }