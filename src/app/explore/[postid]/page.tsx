import { PostInfo } from '@/models/postInfo';
import React from 'react';

async function fetchPost(postid: string): Promise<PostInfo> {
    const fecthedPost: PostInfo = { id: postid, title: "Test Fetched Post", imageUrl: "https://via.placeholder.com/300", author: "Dummy" };
    return fecthedPost;
}

async function PostDetailPage({ params }: { params: { postid: string } }) {
    const post = await fetchPost(params.postid);

    return (
        <div className='m-20 border border-orange-700 flex justify-center items-center'>
            <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="font-bold text-md mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.author}</p>
            </div>
        </div>
    )
};

export default PostDetailPage;