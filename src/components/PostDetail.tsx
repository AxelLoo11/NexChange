"use client";

import React from 'react';
import ImageCarousel from './ImageCarousel';
import Image from 'next/image';
import { Post } from '@/models';

export default function PostDetail(
    { post, readOnly, isOwner }: { post: Post; readOnly?: boolean; isOwner?: boolean }
) {
    const handleAddFavorite = () => {
        console.log("Click Favorite!");
    }

    const handlePurchase = () => {
        console.log("Click Purchase!");
    }

    const handleQuery = () => {
        console.log("Click Query!");
    }
    console.log(readOnly, isOwner);

    return (
        <div className='flex flex-col lg:flex-row justify-center items-center w-full h-full'>
            {/* Large Screen */}
            <>
                {/* Left side (Image) */}
                <div className='hidden lg:w-2/3 lg:flex lg:items-center lg:justify-center lg:bg-slate-500/50 lg:h-full'>
                    <ImageCarousel imageUrls={post.postImages || []} />
                </div>

                {/* Right side (Text area) */}
                <div className="hidden lg:w-1/3 lg:flex lg:flex-col lg:h-full">
                    {/* Owner */}
                    <div className='flex items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
                        <Image
                            src={`/images/${post.postSeller.sellerAvatarURL}`}
                            alt="Owner Avatar"
                            className="p-1 rounded-full"
                            width={40}
                            height={40}
                        />
                        <p className="text-sm text-gray-600 mb-0 text-left">{post.postSeller.sellerName}</p>
                    </div>

                    {/* Description (scrollable area) */}
                    <div className="flex-1 overflow-auto p-4">
                        <h2 className="font-bold text-md mb-2">{post.postTitle}</h2>
                        <h3 className="font-bold text-md mb-2">{post.postName}</h3>
                        <p className="text-sm text-gray-600">{post.postDescription}</p>
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="flex w-full h-16 rounded-lg px-2 my-2">
                        <button id={`${post.postId}&F`} onClick={handleAddFavorite} className="w-1/3 bg-yellow-500 text-white hover:bg-yellow-600">Favorite</button>
                        <button id={`${post.postId}&P`} onClick={handlePurchase} className="w-1/3 bg-blue-500 text-white hover:bg-blue-700">Purchase</button>
                        <button id={`${post.postId}&Q`} onClick={handleQuery} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button>
                    </div>
                </div>
            </>

            {/* Small Screen */}
            <>
                {/* Owner Header Bar*/}
                <div className='flex h-16 w-full items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden'>
                    <p className="text-sm text-gray-600 mb-0 text-left">{post.postSeller.sellerName}</p>
                </div>

                {/* Scrollable Part */}
                <div className='h-[calc(100vh-8em)] overflow-auto w-full lg:hidden'>
                    {/* Images Display */}
                    <div className='flex items-center justify-center bg-slate-500/50 h-1/2'>
                        <ImageCarousel imageUrls={post.postImages || []} />
                    </div>
                    {/* Decription */}
                    <div className='p-2'>
                        <h2 className="font-bold text-md mb-2">{post.postTitle}</h2>
                        <p className="text-sm text-gray-600">{post.postDescription}</p>
                    </div>
                </div>

                {/* Button Footer Bar */}
                <div className='flex w-full h-16 lg:hidden'>
                    <button id={`${post.postId}&F`} className="w-1/3 bg-yellow-500 text-white hover:bg-yellow-600">Favorite</button>
                    <button id={`${post.postId}&P`} className="w-1/3 bg-blue-500 text-white hover:bg-blue-700">Purchase</button>
                    <button id={`${post.postId}&Q`} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button>
                </div>
            </>
        </div>
    )
}
