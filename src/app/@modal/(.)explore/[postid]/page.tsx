"use client";

import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { Post } from '@/models';
import React, { useEffect, useState } from 'react';

function PostDetailModalPage({ params }: { params: { postid: string } }) {
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

    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <PostDetail post={post} />
        </PostModal>
    )
}

export default PostDetailModalPage