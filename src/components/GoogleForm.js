'use client';

import { auth, provider } from './FireBase';
import { Button } from '@mui/material';
import { signInWithPopup } from "firebase/auth";

export default function GoogleForm() {

  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div className="z-50 w-screen h-screen bg-green-300 pt-12 pb-6 px-8 border border-solid border-black drop-shadow-2xl">
      <h2 className="border-b border-solid border-black text-xl pb-6 text-center">サインインして始めよう</h2>
      <div className="flex items-center justify-center h-60">
        <Button
          variant="contained"
          type="submit"
          style={{ width: 200, height: 55, textTransform: 'none', fontSize: 16 }}
          onClick={handleSignIn}
        >Googleでサインイン</Button>
      </div>
    </div>
  );
}