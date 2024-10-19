"use client";

import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
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
        postDescription: null,
        postPrice: 0,
        postStatus: 'ACTIVE'
    };

    const [post, setPost] = useState<Post>(defaultPost);

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

        fetchPostDetail(); // Call the function to fetch post details
    }, []); // Depend on postId so the effect runs when it changes

    return (
        <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            <div className="p-4 w-full lg:w-[calc(100vw-10rem)] lg:h-[calc(100vh-5rem)] h-[calc(100vh-9rem)]">
                <PostDetail post={post} />
            </div>
        </div>
    )
};

export default PostDetailPage;