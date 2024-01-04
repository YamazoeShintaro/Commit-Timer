'use client';

import Image from 'next/image';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { auth, provider } from '@/components/FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import db from "./FireBase";
import { doc, setDoc } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import { Roboto_Slab } from 'next/font/google';

const LogoNavFnt = Roboto_Slab({ subsets: ['latin'] });

export default function Home() {
    const [userProfiles, setUserProfiles] = useState([]);

    const [countNew, setCountNew] = useState(0);

    const [user] = useAuthState(auth);

    // データベースからデータを取得する。
    useEffect(() => {
        const profileData = collection(db, "profiles");
        getDocs(profileData).then((snapShot) => {
            setUserProfiles(snapShot.docs.map((doc) => ({ ...doc.data() })));
        });
    }, [countNew]);

    const userProfile = userProfiles.find(function(element){
        return element.userId === user.uid;
    });

    const handleNewUser = () => {
        setDoc(doc(db, "profiles", user.uid), {
            userId: user.uid,
            name: user.displayName,
            longGoal: "",
            shortGoal: "",
            setTime: "30",
            restTime: "5",
            repeatNumber: "3",
        });

        setCountNew(c => c + 1);
    };

    return (
        <div style={{ color: "#101841" }} className='bg-slate-50'>
            {userProfile ? (
                <div className="h-screen pt-16 flex justify-center">
                    <div className='w-11/12 max-w-lg'>
                        <div style={{ borderColor: "#101841" }} className="flex justify-around items-center border-b border-solid pt-7 pb-5 px-1">
                            <div className="w-3/12 flex justify-center mr-1">
                                <Image className="rounded-full bg-white" src={auth.currentUser.photoURL} width={70} height={70} alt="ユーザーアイコン"/>
                            </div>
                            <div className="flex flex-col justify-center ml-1 text-xl">
                                <p>{userProfile.name}</p>
                            </div>
                        </div>
                        <div className='px-10 py-2'>
                            <div style={{ borderColor: "#101841" }} className='flex py-4 px-2 border-b border-solid'>
                                <p className='w-4/12 flex items-center'>長期目標：</p>
                                <p className='w-8/12'>{userProfile.longGoal}</p>
                            </div>
                            <div style={{ borderColor: "#101841" }} className='flex py-4 px-2 border-b border-solid'>
                                <p className='w-4/12 flex items-center'>短期目標：</p>
                                <p className='w-8/12'>{userProfile.shortGoal}</p>
                            </div>
                            <p style={{ borderColor: "#101841" }} className='py-4 px-2 border-b border-solid'>セットタイム：{userProfile.setTime}分</p>
                            <p style={{ borderColor: "#101841" }} className='py-4 px-2 border-b border-solid'>休憩時間：{userProfile.restTime}分</p>
                            <p style={{ borderColor: "#101841" }} className='py-4 px-2 border-b border-solid'>セット数：{userProfile.repeatNumber}セット</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <div style={{ color: "#101841" }} className="z-50 w-screen h-screen bg-slate-50 pt-12 pb-6 px-8">
                        <div style={{ backgroundColor: "#101841",fontWeight: 380, fontSize: 28 }} className='flex justify-center items-center fixed top-0 left-0 right-0 z-30 text-slate-50 py-3'>
                            <h1 className={LogoNavFnt.className}>Commit Timer</h1>
                        </div>
                        <div className="flex items-center justify-center h-96">
                            <Button
                                variant="contained"
                                type="submit"
                                style={{ width: 200, height: 55, textTransform: 'none', fontSize: 16, backgroundColor: "#70acce" }}
                                onClick={handleNewUser}
                            >はじめる</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}