"use client";

import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
import { useUser } from '@/context/UserContext';
import { Post } from '@/models';
import React, { useEffect, useState } from 'react';

function PostDetailPage({ params }: { params: { postid: string } }) {
    const defaultPost: Post = {
        postId: 'defaultPost',
        postTitle: 'Loading ...',
        postShortcutURL: 'https://avatar.iran.liara.run/public',
        postImages: [],
        postSeller: {
            sellerName: "Loading ...",
            sellerAvatarURL: "01.jpg",
        },
        userId: 'loading ...',
        postName: 'Loading ...',
        postDescription: "Loading ...",
        postPrice: 0,
        postStatus: 'ACTIVE'
    };

    const [post, setPost] = useState<Post>(defaultPost);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const { user } = useUser();
    const userId = user?.userId || "";
    console.log("The User context userid: ", userId);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const fetchpostRes = await fetch(`/api/post?postid=${params.postid}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!fetchpostRes.ok) {
                    throw new Error('Failed to fetch post details');
                }

                const postData = await fetchpostRes.json();
                setPost(postData); // Set the fetched post data
                setIsOwner(postData.userId === userId);
            } catch (error) {
                console.error(error);
                alert("Fetch Post detail failed ...");
            }
        };

        fetchPostDetail(); // Call the function to fetch post details
    }, [isFavorite]); // Depend on isFavorite so the effect runs when it changes

    useEffect(() => {
        const checkWishStatus = async ()=> {
            console.log("[UE-TEST] userId: ", userId);
            if (userId === "") return;
            try {
                const checkFavoriteRes = await fetch(`/api/user/wishlist?userid=${userId}&postid=${post.postId}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!checkFavoriteRes.ok) {
                    throw new Error('Failed to check post wish status ...');
                }

                const checkResult = await checkFavoriteRes.json(); // boolean
                setIsFavorite(checkResult);
            } catch (error) {
                console.error(error);
                alert("Fetch Post wish status failed ...");
            }
        };

        checkWishStatus();
    }, [user]);

    return (
        <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            <div className="p-4 w-full lg:w-[calc(100vw-10rem)] lg:h-[calc(100vh-5rem)] h-[calc(100vh-9rem)]">
                <PostDetail post={post} isFavorite={isFavorite} isOwner={isOwner} userId={userId} />
            </div>
        </div>
    )
};

export default PostDetailPage;