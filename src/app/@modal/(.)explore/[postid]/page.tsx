import ImageCarousel from '@/components/ImageCarousel';
import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { PostInfo } from '@/models/postInfo';
import React from 'react';

async function fetchPost(postid: string): Promise<PostInfo> {
    console.log("Run Fetch at intercepting route ...");
    const dummyImages: string[] = ["https://via.placeholder.com/300", "https://via.placeholder.com/300", "https://via.placeholder.com/300"];
    const fecthedPost: PostInfo = { id: postid, title: "Test Fetched Post Modal", imageUrl: "https://via.placeholder.com/300", imageList: dummyImages, author: "Dummy Modal", description: "test ..." };
    return fecthedPost;
}

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    const post = await fetchPost(params.postid);
    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <PostDetail post={post}/>
        </PostModal>
    )
}

export default PostDetailModalPage