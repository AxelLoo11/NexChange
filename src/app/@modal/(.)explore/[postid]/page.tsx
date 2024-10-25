"use client";

import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { useUser } from '@/context/UserContext';
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
        postDescription: "Loading ...",
        postPrice: 0,
        postStatus: 'ACTIVE'
    };

    const [post, setPost] = useState<Post>(defaultPost);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const { user } = useUser();
    const userId = user?.userId || "";

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

                const checkFavoriteRes = await fetch(`/api/user/wishlist?userid=${userId}&postid=${postData.postId}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!checkFavoriteRes.ok) {
                    throw new Error('Failed to check post wish ...');
                }

                const checkResult = await checkFavoriteRes.json(); // boolean
                setIsFavorite(checkResult);

                setIsOwner(postData.userId === userId);
            } catch (error) {
                console.error(error);
                alert("Fetch Post detail failed ...");
            }
        };

        fetchPostDetail(); // Call the function to fetch post details
    }, []); // Depend on postId so the effect runs when it changes

    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <PostDetail post={post} isFavorite={isFavorite} isOwner={isOwner} userId={userId} />
        </PostModal>
    )
}

export default PostDetailModalPage