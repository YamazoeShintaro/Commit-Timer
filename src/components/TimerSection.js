'use client';

import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { Warning } from "@mui/icons-material";
import finishSound from '@/audio/finish.mp3';
import startSound from '@/audio/start.mp3';
import Trivia from "./Trivia";

const SoundWarningIcon = Warning;

export default function TimerSection({ commitTime, restTime, repeatNumber }) {
    // タイマーを稼働する総時間を計算（単位は"秒"）
    const initialCount = (commitTime * repeatNumber) + (restTime * (repeatNumber - 1));

    const [count, setCount] = useState(initialCount);
    const [isRunning, setIsRunning] = useState(false);
    const [display, setDisplay] = useState("");
    const [triviaNum, setTriviaNum] = useState();

    // "勉強に入る時"と"休憩に入る時"で２種類の音を用意
    const startTimer = new Audio(startSound);
    const finishTimer = new Audio(finishSound);

    const start = () => setIsRunning(true);
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

        // 総時間の残りの秒数によってdisplayを変更
        for (let k = 0; k <= repeatNumber; k++) {
            if (count === initialCount) {
                setDisplay("開始前");
            }
            if (count === (initialCount - (commitTime * k) - (restTime * k)) && count !== initialCount) {
                startTimer.play();
            }
            if (count <= (initialCount - (commitTime * k) - (restTime * k)) && count > (initialCount - (commitTime * (k + 1)) - (restTime * k))) {
                setDisplay(`${k + 1}セット目`);
            }
            if (count === (initialCount - (commitTime * (k + 1)) - (restTime * k))) {
                finishTimer.play();
                // 休憩ごとにランダムで雑学を表示する
                setTriviaNum(Math.floor(Math.random() * 10));
            }
            if (count <= (initialCount - (commitTime * (k + 1)) - (restTime * k)) && count > (initialCount - (commitTime * (k + 1)) - (restTime * (k + 1)))) {
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
            {/* displayによって表示内容を変更 */}
            {display === "開始前" && (
                <p className="flex justify-center text-xl mt-2 mb-8">頑張りましょう！</p>
            )}
            {display === "1セット目" && (
                <div>
                    <p className="flex justify-center text-xl mb-5">〜1セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 1))}
                        </p>
                        <p className="flex items-center pl-4 pr-10 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "1セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-sm pl-16 py-1">2セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 1)) - (restTime * (repeatNumber - 2))}
                        </p>
                        <p className="flex items-center pl-4 pr-5 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット目" && (
                <div>
                    <p className="flex justify-center text-xl mb-5">〜2セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 2))}
                        </p>
                        <p className="flex items-center pl-4 pr-10 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "2セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">3セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 2)) - (restTime * (repeatNumber - 3))}
                        </p>
                        <p className="flex items-center pl-4 pr-5 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット目" && (
                <div>
                    <p className="flex justify-center text-xl mb-5">〜3セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 3))}
                        </p>
                        <p className="flex items-center pl-4 pr-10 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "3セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">4セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 3)) - (restTime * (repeatNumber - 4))}
                        </p>
                        <p className="flex items-center pl-4 pr-5 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット目" && (
                <div>
                    <p className="flex justify-center text-xl mb-5">〜4セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 4))}
                        </p>
                        <p className="flex items-center pl-4 pr-10 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "4セット後の休憩" && (
                <div>
                    <Trivia triviaNum={triviaNum}/>
                    <p className="text-lg pl-16 py-1">5セット目まで</p>
                    <div className="flex justify-center">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (commitTime * (repeatNumber - 4)) - (restTime * (repeatNumber - 5))}
                        </p>
                        <p className="flex items-center pl-4 pr-5 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "5セット目" && (
                <div>
                    <p className="flex justify-center text-xl mb-5">〜5セット目〜</p>
                    <div className="flex">
                        <p className="flex items-center pr-3 pl-6 text-sm">残り</p>
                        <p style={{ color: "#144da0" }} className="text-7xl mb-6">
                            {count - (Time * (repeatNumber - 5)) - (restTime * (repeatNumber - 5))}
                        </p>
                        <p className="flex items-center pl-4 pr-10 text-sm">秒</p>
                    </div>
                </div>
            )}
            {display === "終了後" && (
                <p className="text-2xl mt-2 mb-8">お疲れ様でした！</p>
            )}

            <div className="pb-4">
                <Button
                    variant="contained"
                    style={{ fontSize: 11, width: 112, height: 38, backgroundColor: "#70acce" }}
                    onClick={start}
                >スタート／再開</Button>
                <Button
                    variant="contained"
                    style={{ fontSize: 11, width: 80, height: 38, marginLeft: 9, backgroundColor: "#70acce" }}
                    onClick={pause}
                >一時停止</Button>
                <Button
                    variant="contained"
                    style={{ fontSize: 11, width: 80, height: 38, marginLeft: 9, backgroundColor: "#70acce" }}
                    onClick={reset}
                >リセット</Button>
            </div>
            <p style={{ borderColor: "#101841" }} className="text-xs border-b pb-2 px-6 mx-2">
                <SoundWarningIcon style={{ fontSize: 16, color: "#f6d60f" }} />
                音が出ますので音量にご注意ください
                <SoundWarningIcon style={{ fontSize: 16, color: "#f6d60f" }} />
            </p>
        </div>
    );
}