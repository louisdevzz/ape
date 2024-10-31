'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';
import Image from 'next/image';
import { useSignal, initData } from '@telegram-apps/sdk-react';

export default function PageFriends() {
    const initDataState = useSignal(initData.state);

    const mockFriendsList = [
        { id: 1, name: 'John Doe', level: 'Level 1', points: 10000, photoUrl: '/assets/ape2.jpg' },
        { id: 2, name: 'Jane Smith', level: 'Level 2', points: 15000, photoUrl: '/assets/ape2.jpg' },
        { id: 3, name: 'Alice Johnson', level: 'Level 1', points: 12000, photoUrl: '/assets/ape2.jpg' },
        { id: 3, name: 'Alice Johnson', level: 'Level 1', points: 12000, photoUrl: '/assets/ape2.jpg' },
        { id: 3, name: 'Alice Johnson', level: 'Level 1', points: 12000, photoUrl: '/assets/ape2.jpg' },
        { id: 3, name: 'Alice Johnson', level: 'Level 1', points: 12000, photoUrl: '/assets/ape2.jpg' },
    ];

    return (
        <Page>
            <div className='flex h-full mt-2 flex-col items-center gap-2 p-4'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-white text-3xl font-bold'>Invite Friends</h1>
                    <span className='text-white text-sm'>Get more points by inviting your friends</span>
                    <span className='text-white text-sm'>Score 15% of your friend's points</span>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='w-full h-20 relative'>
                        <div style={{backgroundImage:"url('/assets/frame-task.png')", backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className='w-full h-full'/>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start p-4 gap-2'>
                            <img src="/assets/icon/svg/telegram.svg" alt="Telegram" width={40} height={40} />
                            <div className='flex flex-col'>
                                <span className='text-white text-sm font-semibold'>Invite Friends of Telegram</span>
                                <span className='text-gray-400 text-xs'>10000 points for each friend</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-20 -mt-4 relative'>
                        <div style={{backgroundImage:"url('/assets/frame-task.png')", backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className='w-full h-full'/>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-start p-4 gap-2'>
                            <img src="/assets/icon/png/telegram-premium.png" alt="Telegram" width={40} height={40} />
                            <div className='flex flex-col'>
                                <span className='text-white text-sm font-semibold'>Invite Friends of Telegram Premium</span>
                                <span className='text-gray-400 text-xs'>25000 points for each friend</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className='text-white text-xl font-semibold'>Friends List</span>
                <div className='w-full h-20 -mt-2 relative'>
                        <div style={{backgroundImage:"url('/assets/frame-task.png')", backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className='w-full h-full'/>
                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-between p-4 gap-2'>
                            {/* <img src="/assets/icon/png/telegram-premium.png" alt="Telegram" width={40} height={40} /> */}
                            <div className='flex flex-col'>
                                <span className='text-white text-sm font-semibold'>https://example.com/invite</span>
                            </div>
                            <button className='bg-white hover:bg-blue-700 text-blue-700 font-bold py-2 px-4 rounded transition-all duration-75'>
                                <img src="/assets/icon/svg/copy.svg" alt="Copy" width={20} height={20} />
                            </button>
                        </div>
                    </div>
                <div className='flex flex-col gap-7 w-full mt-2 max-h-[200px] overflow-y-auto'>
                    {mockFriendsList.map(friend => (
                        <div key={friend.id} className='flex flex-row gap-3 items-center'>
                            <Image src={friend.photoUrl} alt="Avatar" width={40} height={40} className="rounded-full" />
                            <div className='flex flex-row justify-between items-center pb-2 border-b-[0.5px] border-white w-full'>
                                <div className='flex flex-col'>
                                    <span className='text-white text-sm font-semibold'>{friend.name}</span>
                                    <span className='text-gray-400 text-xs'>{friend.level}</span>
                                </div>
                                <span className='text-white text-lg font-semibold'>+{friend.points}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
}
