'use client';

import React from "react";
import { useState, useEffect } from "react";
import { Button } from '@mui/material';

export default function TimerSection({ setTime, restTime, repeatNumber }) {
    const initialCount = (setTime * repeatNumber) + (restTime * (repeatNumber - 1));

    const [count, setCount] = useState(initialCount);

    const [isRunning, setIsRunning] = useState(false);

    const [display, setDisplay] = useState("0");

    const start = () => {
        setIsRunning(true);
    };

    const pause = () => setIsRunning(false);

    const reset = () => {
        setCount(initialCount);
        setIsRunning(false);
    };

    const tick = () => {
        if (count > 0) setCount((prevCount) => prevCount - 1);
    };

    useEffect(() => {
        let timerId;

        if (isRunning && count > 0) {
            timerId = setInterval(() => {
                tick()
            }, 1000);
        }

        if (count === initialCount) {
            setDisplay("開始前");
        }
        if (count < initialCount && count >(initialCount - setTime)) {
            setDisplay("1セット目");
        }
        if (count <= (initialCount - setTime) && count >(initialCount - setTime - restTime)) {
            setDisplay("1セット後の休憩");
        }
        if (count <= (initialCount - setTime - restTime) && count >(initialCount - (setTime * 2) - restTime)) {
            setDisplay("2セット目");
        }
        if (count <= (initialCount - (setTime * 2) - restTime) && count >(initialCount - (setTime * 2) - (restTime * 2))) {
            setDisplay("2セット後の休憩");
        }
        if (count <= (initialCount - (setTime * 2) - (restTime * 2)) && count >(initialCount - (setTime * 3) - (restTime * 2))) {
            setDisplay("3セット目");
        }
        if (count <= (initialCount - (setTime * 3) - (restTime * 2)) && count >(initialCount - (setTime * 3) - (restTime * 3))) {
            setDisplay("3セット後の休憩");
        }
        if (count <= (initialCount - (setTime * 3) - (restTime * 3)) && count >(initialCount - (setTime * 4) - (restTime * 3))) {
            setDisplay("4セット目");
        }
        if (count <= (initialCount - (setTime * 4) - (restTime * 3)) && count >(initialCount - (setTime * 4) - (restTime * 4))) {
            setDisplay("4セット後の休憩");
        }
        if (count <= (initialCount - (setTime * 4) - (restTime * 4)) && count >(initialCount - (setTime * 5) - (restTime * 4))) {
            setDisplay("5セット目");
        }
        if (count === 0) {
            setDisplay("終了後");
        }

        return () => {
            if (timerId) clearInterval(timerId)
        };
    }, [isRunning, count]);

    return (
        <div className="flex flex-col items-center justify-center">
            {display === "開始前" && (
                <p className="text-2xl mb-12">頑張りましょう！</p>
            )}
            {display === "1セット目" && (
                <div>
                    <p className="text-2xl mb-10 flex justify-center">〜1セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 1))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "1セット後の休憩" && (
                <div>
                    <p className="text-3xl mb-10 flex justify-center">〜休憩〜</p>
                    <p className="text-lg">2セット目まで</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 2))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット目" && (
                <div>
                    <p className="text-2xl mb-10 flex justify-center">〜2セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 2))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット後の休憩" && (
                <div>
                    <p className="text-3xl mb-10 flex justify-center">〜休憩〜</p>
                    <p className="text-lg">3セット目まで</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 3))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット目" && (
                <div>
                    <p className="text-2xl mb-10 flex justify-center">〜3セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 3))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット後の休憩" && (
                <div>
                    <p className="text-3xl mb-10 flex justify-center">〜休憩〜</p>
                    <p className="text-lg">4セット目まで</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 4))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット目" && (
                <div>
                    <p className="text-2xl mb-10 flex justify-center">〜4セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 4))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット後の休憩" && (
                <div>
                    <p className="text-3xl mb-10 flex justify-center">〜休憩〜</p>
                    <p className="text-lg">5セット目まで</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 5))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "5セット目" && (
                <div>
                    <p className="text-2xl mb-10 flex justify-center">〜5セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p className="text-8xl mb-12">{count - (setTime * (repeatNumber - 5)) - (restTime * (repeatNumber - 5))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "終了後" && (
                <p className="text-3xl mb-12">お疲れ様でした！</p>
            )}
            <div>
                <Button
                    variant="contained"
                    style={{ width: 100, height: 40 }}
                    onClick={start}
                >Start</Button>
                <Button
                    variant="contained"
                    style={{ width: 100, height: 40, marginLeft: 15 }}
                    onClick={pause}
                >Pause</Button>
                <Button
                    variant="contained"
                    style={{ width: 100, height: 40, marginLeft: 15 }}
                    onClick={reset}
                >Reset</Button>
            </div>
        </div>
    );
}