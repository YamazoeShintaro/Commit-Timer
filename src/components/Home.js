'use client';

import Image from 'next/image';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { auth, provider } from '@/components/FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import db from "./FireBase";
import { doc, setDoc } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";

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
            name: "未設定",
            longGoal: "未設定",
            shortGoal: "未設定",
            setTime: "30分",
            restTime: "5分",
            setCount: "3セット",
            genre: "特にない"
        });

        setCountNew(c => c + 1);
    };

    return (
        <div>
            {userProfile ? (
                <div className="h-screen pt-20 flex justify-center">
                    <div className='w-11/12 max-w-lg'>
                        <div className="flex justify-around items-center border-b-2 border-solid border-black pt-8 pb-6 px-3">
                            <div className="w-3/12 flex justify-center mr-6">
                                <Image className="rounded-full bg-white" src={auth.currentUser.photoURL} width={100} height={100} alt="ユーザーアイコン"/>
                            </div>
                            <div className="flex flex-col justify-center ml-2 text-xl">
                                <div className="mb-1.5">
                                    <p>名前：{userProfile.name}</p>
                                </div>
                                <div className="mt-1.5">
                                    <p>総コミット時間：123h45m</p>
                                </div>
                            </div>
                        </div>
                        <div className='px-8 py-6 text-lg'>
                            <p className='py-5 border-b border-solid border-black'>
                                長期目標：{userProfile.longGoal}
                            </p>
                            <p className='py-5 border-b border-solid border-black'>
                                短期目標：{userProfile.shortGoal}
                            </p>
                            <p className='py-5 border-b border-solid border-black'>セットタイム：{userProfile.setTime}分</p>
                            <p className='py-5 border-b border-solid border-black'>休憩時間：{userProfile.restTime}分</p>
                            <p className='py-5 border-b border-solid border-black'>セット数：{userProfile.repeatNumber}セット</p>
                            <p className='py-5 border-b border-solid border-black'>興味：{userProfile.genre}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <div className="z-50 w-screen h-screen bg-green-300 pt-12 pb-6 px-8 border border-solid border-black drop-shadow-2xl">
                        <h2 className="border-b border-solid border-black text-xl pb-6 text-center">新規登録して始めよう</h2>
                        <div className="flex items-center justify-center h-60">
                            <Button
                            variant="contained"
                            type="submit"
                            style={{ width: 200, height: 55, textTransform: 'none', fontSize: 16 }}
                            onClick={handleNewUser}
                            >新規</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}