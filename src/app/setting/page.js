'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { doc, setDoc } from "firebase/firestore";
import { auth } from '@/components/FireBase';
import { useAuthState } from 'react-firebase-hooks/auth';
import db from "@/components/FireBase";
import { collection, getDocs } from "firebase/firestore";

export default function SettingPage() {
    const [userProfiles, setUserProfiles] = useState([]);

    // const [defaultValues, setDefaultValues] = useState({});

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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onsubmit = (data) => {
        const input = {
            userId: user.uid,
            name: data.name,
            longGoal: data.longGoal,
            shortGoal: data.shortGoal,
            setTime: data.setTime,
            restTime: data.restTime,
            repeatNumber: data.repeatNumber,
            // genre: data.genre
        };

        setDoc(doc(db, "profiles", user.uid), input);

        alert('プロフィールを変更しました。');
    };
    const onerror = err => {};

    return (
        <div>
            {userProfile && (
                <div className="bg-slate-50 text-gray-600 h-screen flex items-center justify-center pt-20">
                    <div className="w-5/6 max-w-md">
                        <form action={handleSubmit(onsubmit, onerror)} noValidate>
                            <div className="mb-7 mx-2">
                                <TextField label="ニックネーム" margin="none" size="small" multiline fullWidth defaultValue={userProfile.name}
                                    {...register('name', {
                                        required: 'ニックネームは必須入力です。',
                                        maxLength: {
                                            value: 10,
                                            message: '10文字以内にしてください。'
                                        }
                                    })}
                                    error={'name' in errors}
                                    helperText={errors.name?.message} />
                            </div>
                            <div className="my-7 mx-2">
                                <TextField label="長期目標" margin="none" size="small" multiline fullWidth defaultValue={userProfile.longGoal}
                                    {...register('longGoal', {
                                        required: '長期目標は必須入力です。',
                                        maxLength: {
                                            value: 30,
                                            message: '30文字以内にしてください。'
                                        }
                                    })}
                                    error={'longGoal' in errors}
                                    helperText={errors.longGoal?.message} />
                            </div>
                            <div className="mt-7 mx-2">
                                <TextField label="短期目標" margin="none" size="small" multiline fullWidth defaultValue={userProfile.shortGoal}
                                    {...register('shortGoal', {
                                        required: false,
                                        maxLength: {
                                            value: 30,
                                            message: '30文字以内にしてください。'
                                        }
                                    })}
                                    error={'shortGoal' in errors}
                                    helperText={errors.shortGoal?.message} />
                            </div>
                            <div className="mx-3">
                                <div className="border-b border-solid border-black">
                                    <FormControl>
                                        <p className="mt-5">セットタイム(分)</p>
                                        <RadioGroup name="setTime" defaultValue={userProfile.setTime}>
                                            <div className="flex wrap">
                                                <FormControlLabel value="1" control={<Radio />} label="1"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="30" control={<Radio />} label="30"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="60" control={<Radio />} label="60"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="90" control={<Radio />} label="90"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="border-b border-solid border-black">
                                    <FormControl>
                                        <p className="mt-5">インターバル(分)</p>
                                        <RadioGroup name="restTime" defaultValue={userProfile.restTime}>
                                            <div className="flex wrap">
                                                <FormControlLabel value="1" control={<Radio />} label="1"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="5" control={<Radio />} label="5"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="10" control={<Radio />} label="10"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="20" control={<Radio />} label="20"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="border-b border-solid border-black">
                                    <FormControl>
                                        <p className="mt-5">セット数</p>
                                        <RadioGroup name="repeatNumber" defaultValue={userProfile.repeatNumber}>
                                            <div className="flex wrap">
                                                <FormControlLabel value="3" control={<Radio />} label="3"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="4" control={<Radio />} label="4"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="5" control={<Radio />} label="5"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-6">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{ width: 120, height: 40, backgroundColor: "#70acce" }}
                                >変更</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}