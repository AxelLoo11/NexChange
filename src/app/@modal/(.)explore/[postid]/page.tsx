import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { fetchPostInfo } from '@/app/_lib';
import React from 'react';

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    const post = await fetchPostInfo(params.postid);
    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <PostDetail post={post}/>
        </PostModal>
    )
}

export default PostDetailModalPage