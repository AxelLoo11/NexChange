"use client";

import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { PostInfo } from '@/models/postInfo';
import React, { useEffect, useState } from 'react';

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    }

    const defaultPost: PostInfo = {
        id: 'defaultPost',
        title: 'Loading ...',
        imageUrl: '',
        imageList: [],
        author: 'Loading ...'
    };

    const userId = getCookie('userid') as string;
    const postId = params.postid;
    const [post, setPost] = useState<PostInfo>(defaultPost);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await fetch(`/api/post?postid=${postId}`, {
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
    }, [postId]); // Depend on postId so the effect runs when it changes

    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <PostDetail post={post} />
        </PostModal>
    )
}

export default PostDetailModalPage