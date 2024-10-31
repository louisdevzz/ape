import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { useMongodb } from '../hooks/useMongodb';
import { useSearchParams } from 'next/navigation';

const Home: React.FC = () => {
    const searchParams = useSearchParams();
    const paramInviter = searchParams.get('tgWebAppStartParam');
    const [diamonds, setDiamonds] = React.useState(0);
    const initDataState = useSignal(initData.state);
    //console.log(initDataState?.user);
    const [isFarming, setIsFarming] = useState<boolean>(false); 
    const [profitPerHour, setProfitPerHour] = useState<number>(0);
    const [points, setPoints] = useState<number>(0); // Add state for points
    const [startTime, setStartTime] = useState<number | null>(null); // Add state for start time
    const [clickCount, setClickCount] = useState<number|null>(null); // Initialize click count state
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // State to manage button disabled status
    const [lastClickTime, setLastClickTime] = useState<number | null>(null); // Add state for last click time
    const [isClicking, setIsClicking] = useState(false); // State to manage button disabled status
    
    const totalDuration = 8 * 3600 * 1000; // Total duration of 8 hours in milliseconds
    const elapsedTime = Date.now() - (startTime || 0); // Calculate elapsed time

    const { getPoints, savePoints, createOrUpdateUser } = useMongodb();

    useEffect(() => {
        const initializeUser = async () => {
            if (initDataState?.user?.username) {
                // Create or update user when dapp opens
                await createOrUpdateUser(
                    initDataState.user.username,
                    paramInviter || undefined
                );
                // Load user points
                const totalPoints = await getPoints(initDataState.user.username);
                setDiamonds(totalPoints);
            }
        };
        initializeUser();
    }, [initDataState?.user?.username, paramInviter]);

    useEffect(() => {
        // Load saved points and start time from localStorage
        const savedPoints = localStorage.getItem('points');
        const savedStartTime = localStorage.getItem('startTime');
        if (savedPoints) {
            setPoints(parseFloat(savedPoints)); // Restore points
        }
        if (savedStartTime) {
            const startTimeValue = parseInt(savedStartTime);
            setStartTime(startTimeValue); // Restore start time
            setIsFarming(true); // Set isFarming to true if startTime exists
            // Calculate elapsed time and update points
            const elapsedTime = Date.now() - startTimeValue; // Calculate elapsed time in milliseconds
            const incrementedPoints = Math.floor(elapsedTime / 1000) * 0.1; // Increment points based on elapsed time
            setPoints(prevPoints => prevPoints + incrementedPoints); // Update points
        }
        // Add a useEffect to handle point incrementing
        let interval: NodeJS.Timeout;
        if (isFarming) {
            interval = setInterval(() => {
                setPoints(prevPoints => prevPoints + 0.1); // Increment points every second
            }, 1000);
        }
        return () => clearInterval(interval); // Cleanup on unmount or when farming stops
    }, [isFarming]); // Run when isFarming changes
    useEffect(() => {
        // Save points and start time to localStorage whenever they change
        localStorage.setItem('points', points.toString());
        if (startTime) {
            localStorage.setItem('startTime', startTime.toString());
        }
    }, [points, startTime]); // Save on points or startTime change
    const timeAgo = (): string => {
        if (!startTime) return '08h00m'; // Return default if no start time
        const totalDuration = 8 * 3600 * 1000; // Total duration of 8 hours in milliseconds
        const elapsedTime = Date.now() - startTime; // Calculate elapsed time
        const remainingTime = totalDuration - elapsedTime; // Calculate remaining time
        if (remainingTime <= 0) return '00h00m'; // If time is up, return 00h00m
        const seconds = Math.floor(remainingTime / 1000); // Convert remaining time to seconds
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m`;
    };
    const handleStartFarming = () => {
        setIsFarming(true);
        setPoints(0);
        const currentTime = Date.now();
        setStartTime(currentTime); // Set the start time
        localStorage.setItem('startTime', currentTime.toString()); // Save start time
    };
    useEffect(() => {
        // Load saved click count from localStorage
        const savedClickCount = localStorage.getItem('clickCount');
        if (savedClickCount) {
            const parsedClickCount = parseInt(savedClickCount); // Restore click count
            setClickCount(parsedClickCount); // Update state with parsed value
        }
    }, []); // Run once on mount
    useEffect(() => {
        // Save click count to localStorage whenever it changes
        if (clickCount !== null) {
            localStorage.setItem('clickCount', clickCount.toString());
        }
    }, [clickCount]); // Save on clickCount change
    useEffect(() => {
        // Load button disabled state from localStorage
        const savedButtonState = localStorage.getItem('isButtonDisabled');
        if (savedButtonState) {
            setIsButtonDisabled(savedButtonState === 'true'); // Restore button disabled state
        }
    }, []); // Run once on mount
    useEffect(() => {
        setLastClickTime(Number(localStorage.getItem('timeClick') as string));
    }, [lastClickTime]); // Save on isButtonDisabled change
    useEffect(() => {
        if (lastClickTime) {
            const elapsedTime = Date.now() - lastClickTime;
            if (elapsedTime >= 3600000) {
                setIsButtonDisabled(false);
            }
        }
    }, [lastClickTime]);
    const getRandomClicks = (): number => {
        const clicksArray = [10, 20,30,15,2,3,5,2,5,6,11,2,4,]; // Define possible click increments
        const randomIndex = Math.floor(Math.random() * clicksArray.length); // Get a random index
        return clicksArray[randomIndex]; // Return a random click value
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsClicking(true);
        setTimeout(() => {
            setIsClicking(false);
        }, 100);
        if (clickCount !== null && !isButtonDisabled) { // Check if button is not disabled
            const newClickCount = clickCount + 1; // Increment click count by 1
            setClickCount(newClickCount); // Update click count state
            localStorage.setItem('timeClick', (Date.now() * 3600000).toString()); // Save click count
            // Check if the new click count is a multiple of 10
            if (newClickCount % 10 === 0) {
                const randomClicks = getRandomClicks(); // Get random clicks
                setClickCount((prevCount: any) => prevCount + randomClicks); // Add random clicks
            }
            // Check if clickCount reaches 10,000
            if (newClickCount == 10000) {
                savePoints(initDataState?.user?.username as string, points + 100) // Save updated points to MongoDB
                    .then(success => {
                        if (success) {
                            setDiamonds(points + 100); // Add 100 points
                            // setPoints(prevPoints => prevPoints + 100); // Add 100 points
                            setClickCount(0); // Reset click count
                            // localStorage.setItem('points', (points + 100).toString()); // Save updated points
                        } else {
                            console.error('Failed to save points to MongoDB');
                        }
                    });
            }
        } else {
            setClickCount((prevCount: any) => prevCount + 1);
        }
    };

    const handleClaimPoints = async () => {
        if (initDataState?.user?.username) {
            const success = await savePoints(initDataState.user.username, points);
            
            if (success) {
                const newTotalPoints = await getPoints(initDataState.user.username);
                setDiamonds(newTotalPoints);
                
                setIsFarming(false);
                setPoints(0);
                setStartTime(null);
                // Clear localStorage
                localStorage.removeItem('points');
                localStorage.removeItem('startTime');
            } else {
                console.error('Failed to save points');
            }
        } else {
            console.error('No username found');
        }
    };



    return (
        <div className="flex flex-col">
            <div className='p-3'>
                <div className="px-4 py-3 bg-gray-600 bg-opacity-50 rounded-full shadow-[0_4px_30px_0_rgba(255,255,255,0.5)] flex flex-row justify-between items-center max-w-[220px]">
                    <p className='text-xs text-gray-400'>Total Points: </p>
                    <div className='flex flex-row gap-1 items-center'>
                        <span className='text-xs font-bold text-white'>{diamonds.toFixed(1)}</span>
                        <Image src="/logo-apecoin.gif" alt="ApeCoin" width={16} height={16} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-7">
                <div className="flex items-center">
                <Image src="/logo-apecoin.gif" alt="Diamond" width={40} height={40} />
                <span className="ml-2 text-2xl font-bold text-white">{clickCount||0}/10000</span>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button disabled={isButtonDisabled} className="relative rounded-full flex items-center justify-center shadow-[0_4px_30px_0_rgba(255,255,255,0.5)]" onClick={handleButtonClick}>
                    <Image src={`/assets/ape${isClicking ? '6' : '5'}.png`} alt="ApeCoin" width={220} height={220} />
                </button>
            </div>
            <div className='p-3 mt-12 flex justify-center w-full'>
                <button disabled={isFarming} type="button" className="btn w-full" onClick={elapsedTime >= totalDuration ? handleClaimPoints : handleStartFarming}>
                    <strong>{isFarming ? <div className='flex flex-row justify-between items-center w-full gap-5'>
                        <span>Farming $ {points.toFixed(1)} </span>
                        <small>{timeAgo()}</small>
                    </div> : !isFarming && elapsedTime >= totalDuration ? "Claim Points" : "Start Farming"}</strong>
                    <div id="container-stars">
                        <div id="stars"></div>
                    </div>
                    <div id="glow">
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
