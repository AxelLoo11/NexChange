import Link from 'next/link';
import React from 'react';

const Header = () => (
    <div className="bg-white shadow-md sticky top-0 h-20">
        <div className="container mx-auto flex justify-between items-center p-4 h-full">
            <Link href="/">
                <h1 className="text-lg font-bold text-yellow-500">NexChange</h1>
            </Link>

            {/** Needed this search bar here? */}
            {/* <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded w-full max-w-lg"
            /> */}
        </div>
    </div>
);

export default Header;
