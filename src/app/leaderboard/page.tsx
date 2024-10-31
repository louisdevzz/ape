'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';
import Image from 'next/image';
import { useSignal, initData } from '@telegram-apps/sdk-react';

export default function PageLeaderboard() {
    const t = useTranslations('i18n');
    const initDataState = useSignal(initData.state);

    const mockRankList = [
        { id: 1, name: 'John Doe', points: 100.000, photoUrl: '/assets/ape2.jpg' },
        { id: 2, name: 'Jane Smith', points: 90.000, photoUrl: '/assets/ape2.jpg' },
        { id: 3, name: 'Alice Johnson', points: 80.000, photoUrl: '/assets/ape2.jpg' },
        { id: 4, name: 'Bob Brown', points: 70.000, photoUrl: '/assets/ape2.jpg' },
        { id: 5, name: 'Charlie Davis', points: 60.000, photoUrl: '/assets/ape2.jpg' },
        { id: 6, name: 'Emily Evans', points: 50.000, photoUrl: '/assets/ape2.jpg' },
        { id: 7, name: 'Frank Foster', points: 40.000, photoUrl: '/assets/ape2.jpg' },
        { id: 8, name: 'George Garcia', points: 30.000, photoUrl: '/assets/ape2.jpg' },
        { id: 9, name: 'Helen Harris', points: 20.000, photoUrl: '/assets/ape2.jpg' },
        { id: 10, name: 'Ian Jackson', points: 10.000, photoUrl: '/assets/ape2.jpg' },
    ];

    return (
        <Page>
            <div className='p-4 h-full flex flex-col gap-3 '>
                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-white text-4xl font-bold'>My Rank</h1>
                    <span className='text-white text-lg font-semibold'>#1 | {mockRankList[0].points.toFixed(3)}</span>
                </div>
                <div className='flex flex-col gap-4 mt-5 items-start justify-start max-h-[480px] overflow-y-auto'>
                    {mockRankList.map((rank, index) => (
                        <div key={rank.id} className='flex flex-row gap-5 items-center w-full'>
                            <span className='text-white text-lg font-semibold'>{index + 1}</span>
                            <Image src={rank.photoUrl} alt="Avatar" width={25} height={25} className="rounded-full" />
                            <div className='shadow-lg border-gray-500 border w-full rounded-xl flex justify-between items-center p-2 px-4 bg-gray-800 bg-opacity-50'>
                                <span className='text-white text-sm font-semibold'>{rank.name}</span>
                                <span className='text-white text-sm font-semibold'>{rank.points.toFixed(3)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
}
