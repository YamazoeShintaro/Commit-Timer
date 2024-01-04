'use client';

import Trivia from "./Trivia";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from '@mui/material';
// import TimerSound from "@/audio/timer.mp3";

export default function TimerSection({ setTime, restTime, repeatNumber }) {
    const initialCount = (setTime * repeatNumber) + (restTime * (repeatNumber - 1));

    const [count, setCount] = useState(initialCount);

    const [isRunning, setIsRunning] = useState(false);

    const [display, setDisplay] = useState("");

    const [triviaNum, setTriviaNum] = useState();

    // const audioTimer = new Audio({TimerSound});

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

        for (let k = 0; k <= repeatNumber; k++) {
            if (count === initialCount) {
                setDisplay("開始前");
            }
            if (count <= (initialCount - (setTime * k) - (restTime * k)) && count > (initialCount - (setTime * (k + 1)) - (restTime * k))) {
                setDisplay(`${k + 1}セット目`);
            }
            if (count === (initialCount - (setTime * (k + 1)) - (restTime * k))) {
                // audioTimer.play();
                setTriviaNum(Math.floor(Math.random() * 10));
            }
            if (count <= (initialCount - (setTime * (k + 1)) - (restTime * k)) && count > (initialCount - (setTime * (k + 1)) - (restTime * (k + 1)))) {
                setDisplay(`${k + 1}セット後の休憩`);
            }
            if (count === 0) {
                setDisplay("終了後");
            }
        }

        return () => {
            if (timerId) clearInterval(timerId)
        };
    }, [isRunning, count]);

    return (
        <div style={{ color: "#101841" }} className="flex flex-col items-center justify-center">
            {display === "開始前" && (
                <p className="text-2xl mb-12">頑張りましょう！</p>
            )}
            {display === "1セット目" && (
                <div>
                    <p className="text-2xl mb-8 flex justify-center">〜1セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 1))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "1セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">2セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 2))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット目" && (
                <div>
                    <p className="text-2xl mb-8 flex justify-center">〜2セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 2))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">3セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 3))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット目" && (
                <div>
                    <p className="text-2xl mb-8 flex justify-center">〜3セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 3))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">4セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 4))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット目" && (
                <div>
                    <p className="text-2xl mb-8 flex justify-center">〜4セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 4))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">5セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 5))}</p>
                        <p className="flex items-center pl-4 pr-5">秒</p>
                    </div>
                </div>
            )}
            {display === "5セット目" && (
                <div>
                    <p className="text-2xl mb-8 flex justify-center">〜5セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6">残り</p>
                        <p style={{ color: "#144da0" }} className="text-8xl mb-12">{count - (setTime * (repeatNumber - 5)) - (restTime * (repeatNumber - 5))}</p>
                        <p className="flex items-center pl-4 pr-10">秒</p>
                    </div>
                </div>
            )}
            {display === "終了後" && (
                <p className="text-2xl mb-12">お疲れ様でした！</p>
            )}

            <div style={{ borderColor: "#101841" }} className="border-b pb-12">
                <Button
                    variant="contained"
                    style={{ width: 133, height: 40, backgroundColor: "#70acce" }}
                    onClick={start}
                >スタート／再開</Button>
                <Button
                    variant="contained"
                    style={{ width: 90, height: 40, marginLeft: 15, backgroundColor: "#70acce" }}
                    onClick={pause}
                >一時停止</Button>
                <Button
                    variant="contained"
                    style={{ width: 90, height: 40, marginLeft: 15, backgroundColor: "#70acce" }}
                    onClick={reset}
                >リセット</Button>
            </div>
        </div>
    );
}