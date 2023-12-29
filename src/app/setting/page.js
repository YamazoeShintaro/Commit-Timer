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
            genre: data.genre
        };

        setDoc(doc(db, "profiles", user.uid), input);

        alert('プロフィールを変更しました。');
    };
    const onerror = err => {};

    return (
        <div>
            {userProfile && (
                <div className="h-screen flex items-center justify-center pt-32">
                    <div className="bg-green-300 rounded-xl w-5/6 max-w-md py-10 px-8 border border-solid border-black drop-shadow-2xl">
                        <form action={handleSubmit(onsubmit, onerror)} noValidate>
                            <div className="mb-3 mx-2">
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
                            <div className="my-3 mx-2">
                                <TextField label="長期目標" margin="none" size="small" multiline fullWidth defaultValue={userProfile.longGoal}
                                    {...register('longGoal', {
                                        required: '長期目標は必須入力です。',
                                        maxLength: {
                                            value: 40,
                                            message: '40文字以内にしてください。'
                                        }
                                    })}
                                    error={'longGoal' in errors}
                                    helperText={errors.longGoal?.message} />
                            </div>
                            <div className="mt-2 mx-2">
                                <TextField label="短期目標" margin="none" size="small" multiline fullWidth defaultValue={userProfile.shortGoal}
                                    {...register('shortGoal', {
                                        required: false,
                                        maxLength: {
                                            value: 40,
                                            message: '40文字以内にしてください。'
                                        }
                                    })}
                                    error={'shortGoal' in errors}
                                    helperText={errors.shortGoal?.message} />
                            </div>
                            <div className="mx-3">
                                <div className="border-b border-solid border-black">
                                    <FormControl>
                                        <div className="mt-5">
                                            <FormLabel component="legend">セットタイム</FormLabel>
                                        </div>
                                        <RadioGroup name="setTime">
                                            <div className="flex wrap">
                                                <FormControlLabel value="1" control={<Radio />} label="1分"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="30" control={<Radio />} label="30分"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="60" control={<Radio />} label="60分"
                                                    {...register('setTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="90" control={<Radio />} label="90分"
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
                                        <div className="mt-5">
                                            <FormLabel component="legend">インターバル(休憩)</FormLabel>
                                        </div>
                                        <RadioGroup name="restTime">
                                            <div className="flex wrap">
                                                <FormControlLabel value="1" control={<Radio />} label="1分"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="5" control={<Radio />} label="5分"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="10" control={<Radio />} label="10分"
                                                    {...register('restTime', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="20" control={<Radio />} label="20分"
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
                                        <div className="mt-5">
                                            <FormLabel component="legend">セット数</FormLabel>
                                        </div>
                                        <RadioGroup name="repeatNumber">
                                            <div className="flex wrap">
                                                <FormControlLabel value="3" control={<Radio />} label="3セット"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="4" control={<Radio />} label="4セット"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="5" control={<Radio />} label="5セット"
                                                    {...register('repeatNumber', {
                                                        required: false,
                                                    })}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="border-b border-solid border-black">
                                    <FormControl>
                                        <div className="mt-5">
                                            <FormLabel component="legend">興味のあるジャンル</FormLabel>
                                        </div>
                                        <RadioGroup name="genre">
                                            <div className="flex flex-wrap">
                                                <FormControlLabel value="動物" control={<Radio />} label="動物"
                                                    {...register('genre', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="スポーツ" control={<Radio />} label="スポーツ"
                                                    {...register('genre', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="食べ物" control={<Radio />} label="食べ物"
                                                    {...register('genre', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="歴史" control={<Radio />} label="歴史"
                                                    {...register('genre', {
                                                        required: false,
                                                    })}
                                                />
                                                <FormControlLabel value="特にない" control={<Radio />} label="特にない"
                                                    {...register('genre', {
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
                                    style={{ width: 120, height: 40 }}
                                >変更</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}