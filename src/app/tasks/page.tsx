'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';
import Image from 'next/image';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import Link from 'next/link';

export default function PageTasks() {
    const initDataState = useSignal(initData.state);

    const mockTasks = [
        { id: 1, name: 'Invite 20 friends', points: '1.000' },
        { id: 2, name: 'Invite 50 friends', points: '2.000' },
        { id: 3, name: 'Invite 100 friends', points: '10.000' },
        { id: 4, name: 'Invite 200 friends', points: '50.000' },
        { id: 5, name: 'Invite 500 friends', points: '100.000' },
        { id: 6, name: 'Invite 1000 friends', points: '200.000' },
        { id: 7, name: 'Invite 2000 friends', points: '500.000' },
        { id: 8, name: 'Invite 5000 friends', points: '800.000' },
        { id: 9, name: 'Invite 10000 friends', points: '1.000.000' },
    ];

    return (
        <Page>
            <div className='flex h-full mt-2 flex-col items-center gap-2 p-4'>
                <h1 className='text-white text-3xl font-bold'>Daily Tasks</h1>
                <span className='text-white text-sm'>Complete daily tasks to earn points</span>
                <Image src={initDataState?.user?.photoUrl || "/assets/ape2.jpg"} alt="Avatar" width={120} height={120} className="rounded-full mt-5" />
                <span className='text-white text-lg font-bold'>{initDataState?.user?.firstName}</span>
                <div className='flex flex-col gap-2 w-full mt-6 max-h-[300px] overflow-y-auto'>
                    {mockTasks.map((task) => (
                        <div key={task.id} className='relative'>
                            <div style={{backgroundImage:"url('/assets/frame-task.png')", backgroundSize:"contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}} className='w-full h-20'/>
                            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-between flex-row p-2 px-4'>
                                <div className='flex flex-row gap-2'>
                                    <img src="/assets/icon/svg/task.svg" alt={`Task ${task.id}`} width={40} height={40} />
                                    <div className='flex flex-col'>
                                        <span className='text-white text-sm'>{task.name}</span>
                                        <span className='text-gray-400 text-xs'>{task.points} points</span>
                                    </div>
                                </div>
                                <Link href={"/friends"} className='bg-white px-6 pb-1 rounded-md text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-75'>
                                    <span className='text-xs font-semibold'>Start</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Page>
    );
}
