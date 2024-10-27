'use client';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import Image from 'next/image';

const Header = () => {
    const initDataState = useSignal(initData.state);
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800  sticky top-0 z-50">
            <div className="flex items-center">
            <Image src={initDataState?.user?.photoUrl || "/assets/ape2.jpg"} alt="Avatar" width={40} height={40} className="rounded-full" />
            <div className="ml-2 flex items-center">
                <span className='text-white'>{initDataState?.user?.firstName}</span>
            </div>
            </div>
            <div className="flex items-center">
                <button>
                    <Image src="/assets/icon/svg/setting.svg" alt="Settings" width={24} height={24} />
                </button>
            </div>
        </header>
    );
};

export default Header;