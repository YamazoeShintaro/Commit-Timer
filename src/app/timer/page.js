'use client';

import React from "react";
import TimerSection from "@/components/TimerSection";
import { useState, useEffect } from 'react';
import { auth, provider } from '@/components/FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import db from "@/components/FireBase";
import { collection, getDocs } from "firebase/firestore";


export default function timerPage() {
    const [userProfiles, setUserProfiles] = useState([]);

    const [user] = useAuthState(auth);

    useEffect(() => {
        const profileData = collection(db, "profiles");
        getDocs(profileData).then((snapShot) => {
            setUserProfiles(snapShot.docs.map((doc) => ({ ...doc.data() })));
        });
    }, []);

    const userProfile = userProfiles.find(function(element){
        return element.userId === user.uid;
    });

    return (
        <div>
            {userProfile && (
                <div className="pt-24 w-screen h-screen bg-red-300">
                    <ul className="flex justify-center text-xl mb-2">
                        <li>セットタイム：{userProfile.setTime}分&nbsp;</li>
                        <li>／ 休憩：{userProfile.restTime}分</li>
                    </ul>
                    <div className="flex justify-center">
                        <p className="flex justify-center text-xl mb-12 pb-5 border-b border-solid border-black w-11/12 max-w-md">【 {userProfile.repeatNumber}セット 】</p>
                    </div>
                    <div><TimerSection setTime={userProfile.setTime * 60} restTime={userProfile.restTime * 60} repeatNumber={userProfile.repeatNumber} /></div>
                </div>
            )}
        </div>
    );
}