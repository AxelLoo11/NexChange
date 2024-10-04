import Link from 'next/link';
import React from 'react';

const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
            <Link href="/explore">
                <h1 className="text-lg font-bold text-yellow-500">NexChange</h1>
            </Link>

            {/** Needed this search bar here? */}
            <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded w-full max-w-lg"
            />
        </div>
    </header>
);

export default Header;
