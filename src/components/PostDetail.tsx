"use client";

import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import Image from 'next/image';
import { Post } from '@/models';
import WishBtn from './WishBtn';
// import { useRouter } from 'next/navigation';

export default function PostDetail(
    { post, userId, isFavorite, isOwner }: { post: Post; userId: string; isFavorite: boolean; isOwner: boolean }
) {
    // const router = useRouter();
    const [wishStatus, setWishStatus] = useState<boolean>(isFavorite);
    const isInteractive = post.postStatus === 'ACTIVE'; // controll the Favorite and Purchase button active
    const isRemovable = post.postStatus !== 'IN_TRANSACTION'; // PENDING ??? NOT SURE !!!!!!!!!!!!!!

    const statusColor = post.postStatus === "ACTIVE" ? "green" : post.postStatus === "PENDING" ? "blue" : post.postStatus === "IN_TRANSACTION" ? "yellow" : "gray";
    const statusColorCSS = `text-${statusColor}-600`;

    const handleAddFavorite = async () => {
        const response = await fetch(`/api/user/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                refPostId: post.postId,
                refPostPrice: post.postPrice,
                refPostShortcutURL: post.postShortcutURL,
                refPostStatus: post.postStatus,
                refPostTitle: post.postTitle
            }),
            credentials: 'include',
        });

        if (response.ok) {
            setWishStatus(!wishStatus);
        } else {
            console.error("Failed to add post to wishlist.");
        }
    };

    const handleRemoveFavorite = async () => {
        const response = await fetch(`/api/user/wishlist?userId=${userId}&refPostId=${post.postId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            setWishStatus(!wishStatus);
        } else {
            console.error("Failed to add post to wishlist.");
        }
    };

    const handlePurchase = async () => {
        try {
            const res = await fetch("/api/order", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ userId: userId, postId: post.postId })
            });

            if (!res.ok) {
                throw new Error("Create Order error ...")
            }

            const data = await res.json();
            const orderId = data.orderId as string;

            // router.push(`/order/${userId}/${orderId}`);
            window.location.href = `/order/${userId}/${orderId}`;
        } catch (error) {
            console.log(error);
            alert("Create New Order error ... please try again ...");
        }
    };

    const handleDeletePost = async () => {
        try {
            const res = await fetch(`/api/post?postid=${post.postId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error("Delete Post Error");
            }

            // router.push('/explore');
            window.location.href = '/explore';
        } catch (error) {
            console.log(error);
            alert("Delete Post Failed ... Please try again ...");
        }
    };

    const handleEditPost = () => {
        // router.push(`/post/edit/${post.postId}`);
        window.location.href = `/post/edit/${post.postId}`;
    };

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

                    <div className='flex w-full px-4'>
                        <p className={`text-sm ${statusColorCSS}`}>{post.postStatus}</p>
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="flex w-full h-16 rounded-lg px-2 my-2">
                        {isOwner ? (
                            <>
                                <button onClick={handleEditPost} disabled={!isInteractive} className='flex-1 mr-2 bg-blue-500 text-white hover:bg-blue-700 rounded'>Edit Post</button>
                                <button onClick={handleDeletePost} disabled={!isRemovable} className='flex-1 ml-2 bg-red-500 text-white hover:bg-red-700 rounded'>Delete Post</button>
                            </>
                        ) : (
                            <>
                                <WishBtn wishStatus={wishStatus} addToWishlist={handleAddFavorite} removeFromWishlist={handleRemoveFavorite} isActive={isInteractive} />
                                <button disabled={!isInteractive} onClick={handlePurchase} className="flex-auto bg-blue-500 text-white hover:bg-blue-700 rounded">Purchase</button>
                                {/* <button id={`${post.postId}&Q`} onClick={handleQuery} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button> */}
                            </>
                        )}
                    </div>
                </div>
            </>

            {/* Small Screen */}
            <>
                {/* Owner Header Bar*/}
                <div className='flex h-16 w-full items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden'>
                    <Image
                        src={`/images/${post.postSeller.sellerAvatarURL}`}
                        alt="Owner Avatar"
                        className="p-1 rounded-full"
                        width={40}
                        height={40}
                    />
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

                <div className='w-full px-4 lg:hidden'>
                    <p className={`text-sm ${statusColorCSS}`}>{post.postStatus}</p>
                </div>

                {/* Button Footer Bar */}
                <div className='flex w-full h-16 lg:hidden'>
                    {isOwner ? (
                        <>
                            <button onClick={handleEditPost} disabled={!isInteractive} className='w-1/2 bg-blue-500 text-white hover:bg-blue-700'>Edit Post</button>
                            <button onClick={handleDeletePost} disabled={!isRemovable} className='w-1/2 bg-red-500 text-white hover:bg-red-700'>Delete Post</button>
                        </>
                    ) : (
                        <>
                            <WishBtn wishStatus={wishStatus} addToWishlist={handleAddFavorite} removeFromWishlist={handleRemoveFavorite} isActive={isInteractive} />
                            <button disabled={!isInteractive} onClick={handlePurchase} className="flex-auto bg-blue-500 text-white hover:bg-blue-700">Purchase</button>
                            {/* <button id={`${post.postId}&Q`} onClick={handleQuery} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button> */}
                        </>
                    )}
                </div>
            </>
        </div>
    )
}
