import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import Header from './Header';

const FARMING_DURATION = 60 * 1000; // 1 phút trong mili giây

const Home: React.FC = () => {
    const [diamonds, setDiamonds] = useState(0);
    const initDataState = useSignal(initData.state);
    const [isFarming, setIsFarming] = useState<boolean>(false); 
    const [points, setPoints] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null); 

    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        const storedPoints = localStorage.getItem('points');
        if (storedStartTime) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - Number(storedStartTime);
            const newPoints = Math.floor(elapsedTime / 1000); // Tính điểm dựa trên thời gian đã trôi qua, mỗi giây tăng 1 điểm
            setStartTime(Number(storedStartTime));
            setPoints(storedPoints ? Number(storedPoints) + newPoints : newPoints); // Cập nhật điểm
            setIsFarming(true); // Bắt đầu farming nếu có startTime
            localStorage.setItem('points', (storedPoints ? Number(storedPoints) + newPoints : newPoints).toString()); // Cập nhật điểm vào localStorage
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isFarming && startTime) {
                const currentTime = Date.now();
                if (currentTime - startTime < FARMING_DURATION) {
                    setPoints(prevPoints => {
                        const newPoints = prevPoints + 1; // Tăng điểm mỗi giây
                        localStorage.setItem('points', newPoints.toString()); // Cập nhật điểm vào localStorage
                        return newPoints;
                    });
                } else {
                    clearInterval(interval);
                    setIsFarming(false); // Dừng farming khi hết thời gian
                    localStorage.removeItem('startTime'); // Xóa startTime khỏi localStorage
                    localStorage.removeItem('points'); // Xóa điểm khỏi localStorage
                }
            }
        }, 1000); // Tăng điểm mỗi giây

        return () => clearInterval(interval);
    }, [isFarming, startTime]);

    const handleStartFarming = () => {
        const currentTime = Date.now();
        localStorage.setItem('startTime', currentTime.toString());
        setStartTime(currentTime);
        setPoints(0); // Đặt lại điểm khi bắt đầu farming
        setIsFarming(true); // Bắt đầu farming
        localStorage.setItem('points', '0'); // Đặt lại điểm trong localStorage
    };

    const handleClaimPoints = () => {
        if (isFarming && startTime !== null && (Date.now() - startTime) >= FARMING_DURATION) {
            // Logic để claim điểm
            alert(`Bạn đã claim ${points} điểm!`); // Thay thế bằng logic thực tế để xử lý điểm
            setIsFarming(false);
            setStartTime(null);
            setPoints(0); // Đặt lại điểm sau khi claim
            localStorage.removeItem('startTime');
            localStorage.removeItem('points');
        }
    };

    const timeAgo = (startTime: number | null) => {
        if (!startTime) return '';

        const elapsedTime = Date.now() - startTime; // Thời gian đã trôi qua
        const remainingTime = FARMING_DURATION - elapsedTime; // Thời gian còn lại

        if (remainingTime <= 0) return '00m00s'; // Nếu hết thời gian, trả về 0

        const seconds = Math.floor(remainingTime / 1000); // Chuyển đổi mili giây thành giây
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}m${formattedSeconds}s`;
    };

    return (
        <div className="flex flex-col">
            <div className='p-3'>
                <div className="px-4 py-3 bg-gray-600 bg-opacity-50 rounded-full shadow-[0_4px_30px_0_rgba(255,255,255,0.5)] flex flex-row justify-between items-center max-w-[220px]">
                    <p className='text-xs text-gray-400'>Profit per hour: </p>
                    <div className='flex flex-row gap-1 items-center'>
                        <span className='text-xs font-bold text-white'>0.00</span>
                        <Image src="/logo-apecoin.gif" alt="ApeCoin" width={16} height={16} />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-7">
                <div className="flex items-center">
                <Image src="/logo-apecoin.gif" alt="Diamond" width={40} height={40} />
                <span className="ml-2 text-2xl font-bold text-white">{diamonds}</span>
                </div>
            </div>

            <div className="flex justify-center mt-8 cursor-not-allowed">
                <button disabled={isFarming && startTime !== null && (Date.now() - startTime) < FARMING_DURATION} className="relative rounded-full flex items-center justify-center shadow-[0_4px_30px_0_rgba(255,255,255,0.5)]" onClick={() =>{}}>
                    <Image src={`/assets/ape${isFarming ? '6' : '5'}.png`} alt="ApeCoin" width={220} height={220} />
                </button>
            </div>
            <div className='p-4 mt-16 flex justify-center w-full relative'>
                <button 
                    disabled={isFarming && startTime !== null && (Date.now() - startTime) < FARMING_DURATION} 
                    type="button" 
                    className="text-white btn" 
                    onClick={startTime && (Date.now() - startTime) >= FARMING_DURATION ? handleClaimPoints : handleStartFarming}
                >
                    <strong>
                        {isFarming ? (
                            <div className='flex flex-row justify-center items-center w-full gap-5'>
                                <span>
                                    {`Farming $ ${points?.toFixed(1) || '0.00'}`}
                                </span>
                                <small className='text-xs text-gray-400'>{timeAgo(startTime)}</small>
                            </div>
                        ) : `Start Farming`}
                    </strong>
                </button>
            </div>
        </div>
    );
};

export default Home;
