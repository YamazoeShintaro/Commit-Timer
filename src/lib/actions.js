// 'use client';

// import { redirect } from 'next/navigation';
// import { doc, setDoc } from "firebase/firestore";
// import db from "@/components/FireBase";
// import { auth } from '@/components/FireBase';
// import { useAuthState } from 'react-firebase-hooks/auth';

// export function addProfile(data) {
//     const [user] = useAuthState(auth);

//     const input = {
//         userId: user.uid,
//         name: data.get('name'),
//         longGoal: data.get('longGoal'),
//         shortGoal: data.get('shortGoal'),
//         setTime: data.get('setTime'),
//         restTime: data.get('restTime'),
//         setCount: data.get('setCount'),
//         genre: data.get('genre')
//     };

//     setDoc(doc(db, "profiles", user.uid), input);

//     redirect('/');
// }