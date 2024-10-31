'use client';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const initDataState = useSignal(initData.state);
    return (
        <header className="flex justify-between items-center p-4 py-3 bg-gray-800  sticky top-0 z-50">
            <div className="flex items-center">
            <Image src={initDataState?.user?.photoUrl || "/assets/ape2.jpg"} alt="Avatar" width={25} height={25} className="rounded-full" />
            <div className="ml-2 flex items-center">
                <span className='text-white'>{initDataState?.user?.firstName}</span>
            </div>
            </div>
            <div className="flex items-center">
                <Link href="/wallet">
                    <Image src="/assets/icon/svg/setting.svg" alt="Settings" width={24} height={24} />
                </Link>
            </div>
        </header>
    );
};

export default Header;