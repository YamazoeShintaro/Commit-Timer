'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './FireBase';
import db from "./FireBase";
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { Button } from '@mui/material';
import { Roboto_Slab } from 'next/font/google';

const LogoFnt = Roboto_Slab({ subsets: ['latin'] });

export default function Home() {
    const [user] = useAuthState(auth);
    const [userProfiles, setUserProfiles] = useState([]);
    const [newUserCount, setNewUserCount] = useState(0);

    // Homeを開くたびにデータベースから最新のデータを取得し、userProfileを更新する
    useEffect(() => {
        const profileData = collection(db, "profiles");
        getDocs(profileData).then((snapShot) => {
            setUserProfiles(snapShot.docs.map((doc) => ({ ...doc.data() })));
        });
    }, [newUserCount]);

    // ログインしたのが新規ユーザーの場合、既定値でデータベースにユーザーを登録
    const handleNewUser = () => {
        setDoc(doc(db, "profiles", user.uid), {
            userId: user.uid,
            name: user.displayName,
            longGoal: "",
            shortGoal: "",
            commitTime: "30",
            restTime: "5",
            repeatNumber: "3",
        });
        setNewUserCount(c => c + 1);
    };

    // 現在Googleでログインしているユーザーのuidを使い、IDが一致するデータを取得
    const userProfile = userProfiles.find(function(element){
        return element.userId === user.uid;
    });

    return (
        <div style={{ color: "#101841" }} className='bg-slate-50'>
            {userProfile ? (
                // userprofileが取得できた時（既にデータベースのユーザー情報がある時）、Homeのプロフィール画面を表示
                <div className="pt-16 h-screen flex justify-center">
                    <div className='w-11/12 max-w-lg'>
                        <div
                            style={{ borderColor: "#101841" }}
                            className="flex justify-around items-center border-b pt-7 pb-5 px-1"
                        >
                            <div className="w-3/12 flex justify-center mr-1">
                                <Image className="rounded-full" src={auth.currentUser.photoURL} width={70} height={70} alt=""/>
                            </div>
                            <div className="text-xl flex-col justify-center ml-1">
                                <p>{userProfile.name}</p>
                            </div>
                        </div>
                        <div className='px-10 py-2'>
                            <div style={{ borderColor: "#101841" }} className='flex py-4 px-2 border-b'>
                                <p className='w-4/12 flex items-center'>長期目標：</p>
                                <p className='w-8/12'>{userProfile.longGoal}</p>
                            </div>
                            <div style={{ borderColor: "#101841" }} className='flex py-4 px-2 border-b'>
                                <p className='w-4/12 flex items-center'>短期目標：</p>
                                <p className='w-8/12'>{userProfile.shortGoal}</p>
                            </div>
                            <div style={{ borderColor: "#101841" }} className='py-4 px-2 border-b'>
                                <p>コミットタイム：{userProfile.commitTime}分</p>
                                <p className='text-sm'>(1セットあたりの時間)</p>
                            </div>
                            <p style={{ borderColor: "#101841" }} className='py-4 px-2 border-b'>
                                休憩時間：{userProfile.restTime}分
                            </p>
                            <p style={{ borderColor: "#101841" }} className='py-4 px-2 border-b'>
                                セット数：{userProfile.repeatNumber}セット
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                // userProfileが取得できなかった時（新規ユーザーの時）、uidをIDとして初期値でユーザー登録をするボタンを表示
                <div className="flex">
                    <div
                        style={{ color: "#101841" }}
                        className="flex justify-center items-center z-50 w-screen h-screen bg-slate-50 pt-12 pb-6 px-8"
                    >
                        <div
                            style={{ backgroundColor: "#101841",fontWeight: 380, fontSize: 28 }}
                            className='py-3 flex justify-center items-center text-slate-50 fixed top-0 left-0 right-0 z-30'
                        >
                            <h1 className={LogoFnt.className}>Commit Timer</h1>
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