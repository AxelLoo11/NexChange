import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
import { PostInfo } from '@/models/postInfo';
import React from 'react';

async function fetchPost(postid: string): Promise<PostInfo> {
    console.log("Run Fetch at origin route ...");
    const dummyImages: string[] = ["https://via.placeholder.com/300", "https://via.placeholder.com/300", "https://via.placeholder.com/300"];
    const fecthedPost: PostInfo = { id: postid, title: "Test Fetched Post", imageUrl: "https://via.placeholder.com/300", imageList: dummyImages, author: "Dummy", description:"test\ntest\ntest\ntest\ntest\ntest\n" };
    return fecthedPost;
}

async function PostDetailPage({ params }: { params: { postid: string } }) {
    const userId = "123"; // later change to fetch user id from header? or other place ...
    const post = await fetchPost(params.postid);

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