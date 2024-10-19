"use client"; // Required for client-side rendering

import Link from 'next/link';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user } = useUser();

  return (
    <div className="bg-white shadow-md sticky top-0 h-20">
      <div className="container mx-auto flex justify-between items-center p-4 h-full">
        <Link href="/">
          <h1 className="text-lg font-bold text-yellow-500">NexChange</h1>
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-semibold">Hello!</span>
            <img
              src={`/images/${user.userAvatarURL}`}
              alt={user.userNickName}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-700 font-semibold">{user.userNickName}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
