'use client';

import Image from 'next/image';
import { Link } from '@/components/Link/Link';
const Navbar = () => {
    return (
        <nav className="fixed bottom-3 left-0 right-0 p-4 pb-6">
            <ul className="flex justify-between max-w-[90vw] rounded-full mx-auto bg-gray-800 px-6 py-2 items-center">
                <li>
                    <Link href="/" style={{color:"white"}} className="flex flex-col items-center gap-1">
                        <Image src="/assets/icon/svg/home.svg" alt="Home" width={22} height={22} />
                        <span className="text-xs font-semibold">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/tasks" style={{color:"white"}} className="flex flex-col items-center gap-1">
                        <Image src="/assets/icon/svg/task.svg" alt="Tasks" width={24} height={24} />
                        <span className="text-xs font-semibold">Tasks</span>
                    </Link>
                </li>
                <li>
                    <Link href="/friends" style={{color:"white"}}   className="flex flex-col items-center gap-1">
                        <Image src="/assets/icon/svg/friend.svg" alt="Friends" width={24} height={24} />
                        <span className="text-xs font-semibold">Friends</span>
                    </Link>
                </li>
                <li>
                    <Link href="/leaderboard" style={{color:"white"}} className="flex flex-col items-center gap-1">
                        <Image src="/assets/icon/svg/leaderboard.svg" alt="Leaderboard" width={24} height={24} />
                        <span className="text-xs font-semibold">Leaderboard</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;