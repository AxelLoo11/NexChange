"use client";

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import React from 'react';
import { AiOutlineHome, AiOutlineMessage, AiOutlinePlus, AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';

const Navigation = () => {
    const { user } = useUser();
    return (
        <>
            {user ? (
                <>
                    {/* Bottom navigation for small screens */}
                    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg h-16 flex justify-around items-center lg:hidden">
                        <NavItem href="/explore" icon={<AiOutlineHome />} text="Explore" />
                        <NavItem href="/post" icon={<AiOutlinePlus />} text="Post" />
                        <NavItem href={`/chat/${user.userId}`} icon={<AiOutlineMessage />} text="Chat" />
                        <NavItem href={`/order/${user.userId}`} icon={<AiOutlineHistory />} text="Order" />
                        <NavItem href={`/user/${user.userId}`} icon={<AiOutlineUser />} text="Me" />
                    </nav>

                    {/* Side navigation for large screens */}
                    <nav className="hidden lg:flex lg:flex-col lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100vh-5rem)] lg:w-40 lg:bg-white lg:shadow-lg lg:items-center lg:py-2">
                        <NavItem href="/explore" icon={<AiOutlineHome />} text="Explore" vertical />
                        <NavItem href="/post" icon={<AiOutlinePlus />} text="Post" vertical />
                        <NavItem href={`/chat/${user.userId}`} icon={<AiOutlineMessage />} text="Chat" vertical />
                        <NavItem href={`/order/${user.userId}`} icon={<AiOutlineHistory />} text="Order" vertical />
                        <NavItem href={`/user/${user.userId}`} icon={<AiOutlineUser />} text="Me" vertical />
                    </nav>
                </>
            ) : null}
        </>
    );
};

const NavItem = ({ href, icon, text, vertical = false }: { href: string; icon: JSX.Element; text: string; vertical?: boolean }) => (
    <Link href={href} className={`flex px-5 hover:bg-gray-200 text-yellow-600 hover:text-yellow-800 ${vertical ? 'w-full' : 'w-1/5 h-16'} items-center`}>
        <div className={`flex ${vertical ? 'my-4' : 'justify-center'} transition items-center w-full`}>
            <div className='flex-none'>{icon}</div>
            <span className='text-md font-bold px-2 flex-auto text-center' >{text}</span>
        </div>
    </Link>
);

export default Navigation;
