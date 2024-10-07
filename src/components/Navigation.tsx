import Link from 'next/link';
import React from 'react';
import { AiOutlineHome, AiOutlineMessage, AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';

const Navigation = ({ userId }: { userId: string }) => {
    return (
        <>
            {/* Bottom navigation for small screens */}
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center p-4 lg:hidden">
                <NavItem href="/explore" icon={<AiOutlineHome />} text="Explore" />
                <NavItem href="/post" icon={<AiOutlinePlus />} text="Post" />
                <NavItem href={`/chat/${userId}`} icon={<AiOutlineMessage />} text="Chat" />
                <NavItem href={`/user/${userId}`} icon={<AiOutlineUser />} text="Me" />
            </nav>

            {/* Side navigation for large screens */}
            <nav className="hidden lg:flex lg:flex-col lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100vh-5rem)] lg:w-40 lg:bg-white lg:shadow-lg lg:items-center lg:py-2">
                <NavItem href="/explore" icon={<AiOutlineHome />} text="Explore" vertical />
                <NavItem href="/post" icon={<AiOutlinePlus />} text="Post" vertical />
                <NavItem href={`/chat/${userId}`} icon={<AiOutlineMessage />} text="Chat" vertical />
                <NavItem href={`/user/${userId}`} icon={<AiOutlineUser />} text="Me" vertical />
            </nav>
        </>
    );
};

const NavItem = ({ href, icon, text, vertical = false }: { href: string; icon: JSX.Element; text: string; vertical?: boolean }) => (
    <Link href={href}>
        <div className={`flex ${vertical ? 'items-center my-4' : ''} text-yellow-600 hover:text-yellow-800 transition items-center`}>
            {icon}
            <span className={`text-md font-bold px-2`}>{text}</span>
        </div>
    </Link>
);

export default Navigation;
