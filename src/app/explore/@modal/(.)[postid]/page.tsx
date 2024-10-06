import PostModal from '@/components/PostModal';
import { PostInfo } from '@/models/postInfo';
import React from 'react';

async function fetchPost(postid: string): Promise<PostInfo> {
    const fecthedPost: PostInfo = { id: postid, title: "Test Fetched Post Modal", imageUrl: "https://via.placeholder.com/300", author: "Dummy Modal" };
    return fecthedPost;
}

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    const post = await fetchPost(params.postid);
    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <div className='border border-orange-700 flex justify-center items-center'>
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
        </PostModal>
    )
}

export default PostDetailModalPage