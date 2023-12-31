'use client';

import { auth, provider } from './FireBase';
import { Button } from '@mui/material';
import { signInWithPopup } from "firebase/auth";

export default function GoogleForm() {

  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div style={{ color: "#101841" }} className="z-50 w-screen h-screen bg-slate-50 pt-12 pb-6 px-8">
      <h2 style={{ borderColor: "#101841" }} className="border-b border-solid text-xl pb-6 text-center">サインインして始めよう</h2>
      <div className="flex items-center justify-center h-60">
        <Button
          variant="contained"
          type="submit"
          style={{ width: 200, height: 55, textTransform: 'none', fontSize: 16, backgroundColor: "#70acce" }}
          onClick={handleSignIn}
        >Googleでサインイン</Button>
      </div>
    </div>
  );
}