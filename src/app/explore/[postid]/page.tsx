"use client";

import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
import { PostInfo } from '@/models/postInfo';
import React, { useEffect, useState } from 'react';

function PostDetailPage({ params }: { params: { postid: string } }) {
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    }

    const defaultPost: PostInfo = {
        id: 'defaultPost',
        title: 'Loading ...',
        imageUrl: 'https://avatar.iran.liara.run/public',
        imageList: [],
        author: 'Loading ...',
        authorAvatar: '01'
    };

    const [userId, setUserId] = useState<string>("");
    const [post, setPost] = useState<PostInfo>(defaultPost);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await fetch(`/api/post?postid=${params.postid}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch post details');
                }

                const postData = await response.json();
                setPost(postData); // Set the fetched post data
            } catch (error) {
                console.error(error);
                // Handle the error as needed, e.g., set an error state or show a notification
            }
        };

        setUserId(getCookie('userid') as string);
        fetchPostDetail(); // Call the function to fetch post details
    }, []); // Depend on postId so the effect runs when it changes

    return (
        <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
            <div className='lg:w-40 w-0'>
                <Navigation userId={userId} />
            </div>

            <div className="p-4 w-full lg:w-[calc(100vw-10rem)] lg:h-[calc(100vh-5rem)] h-[calc(100vh-9rem)]">
                <PostDetail post={post} />
            </div>
        </div>
    )
};

export default PostDetailPage;