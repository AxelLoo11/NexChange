import React, { useState } from 'react';

interface WishBtnProps {
    wishStatus: boolean;
    addToWishlist: () => Promise<void>;
    removeFromWishlist: () => Promise<void>;
    isActive: boolean;
}

const WishBtn: React.FC<WishBtnProps> = ({ wishStatus, addToWishlist, removeFromWishlist, isActive }) => {
    const [status, setStatus] = useState<boolean>(wishStatus);

    const toggleWishStatus = () => {
        if (status) {
            removeFromWishlist();
        }
        else {
            addToWishlist();
        }
        setStatus(!status);
    };

    return (
        <button
            onClick={toggleWishStatus}
            className={`flex items-center justify-center w-12 h-12 m-2 rounded-full border-2 transition-colors duration-400 
                ${status ? 'bg-yellow-400 border-yellow-400 text-white' : 'bg-transparent border-gray-400 text-gray-400 hover:border-yellow-500 hover:text-yellow-500'}`}
            aria-label={status ? 'Remove from wishlist' : 'Add to wishlist'}
            disabled={!isActive}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={status ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27l5.18 3.09-1.64-6.19L20 9.24l-6.32-.51L12 3 10.32 8.73 4 9.24l4.46 4.93-1.64 6.19L12 17.27z"
                />
            </svg>
        </button>
    );
};

export default WishBtn;
