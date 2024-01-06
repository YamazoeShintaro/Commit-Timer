'use client';

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "@/components/FireBase";
import db from "@/components/FireBase";
import TimerSection from "@/components/TimerSection";

export default function TimerPage() {
    const [userProfiles, setUserProfiles] = useState([]);
    const [user] = useAuthState(auth);

    // データベースからログイン中のユーザー情報を取得する
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
                <div style={{ color: "#101841" }} className="pt-20 w-screen h-screen bg-slate-50">
                    <ul className="flex justify-center text-xl mb-2 pt-2">
                        <li>コミットタイム：{userProfile.commitTime}分&nbsp;</li>
                        <li>／ 休憩：{userProfile.restTime}分</li>
                    </ul>
                    <div className="flex justify-center">
                        <p
                            style={{ borderColor: "#101841" }}
                            className="flex justify-center text-xl mb-8 pb-3 border-b w-11/12 max-w-md"
                        >
                            【 {userProfile.repeatNumber}セット 】
                        </p>
                    </div>
                    <TimerSection
                        // 単位を"秒"に直して渡す
                        commitTime={userProfile.commitTime * 60}
                        restTime={userProfile.restTime * 60}
                        // セット数
                        repeatNumber={userProfile.repeatNumber}
                    />
                </div>
            )}
        </div>
    );
}