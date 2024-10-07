import ImageCarousel from '@/components/ImageCarousel';
import PostModal from '@/components/PostModal';
import { PostInfo } from '@/models/postInfo';
import React from 'react';

async function fetchPost(postid: string): Promise<PostInfo> {
    const dummyImages: string[] = ["https://via.placeholder.com/300", "https://via.placeholder.com/300", "https://via.placeholder.com/300"];
    const fecthedPost: PostInfo = { id: postid, title: "Test Fetched Post Modal", imageUrl: "https://via.placeholder.com/300", imageList: dummyImages, author: "Dummy Modal", description: "test ..." };
    return fecthedPost;
}

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    const post = await fetchPost(params.postid);
    console.log("Intercepting Mounted!!!");

    return (
        <PostModal>
            <div className='flex flex-col lg:flex-row justify-center items-center w-full h-full'>
                {/* Large Screen */}
                <>
                    {/* Left side (Image) */}
                    <div className='hidden lg:w-2/3 lg:flex lg:items-center lg:justify-center lg:bg-slate-500/50 lg:h-full'>
                        <ImageCarousel imageUrls={post.imageList} />
                    </div>

                    {/* Right side (Text area) */}
                    <div className="hidden lg:w-1/3 lg:flex lg:flex-col lg:h-full">
                        {/* Owner */}
                        <div className='flex items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
                            <p className="text-sm text-gray-600 mb-0 text-left">{post.author}</p>
                        </div>

                        {/* Description (scrollable area) */}
                        <div className="flex-1 overflow-auto p-4">
                            <h2 className="font-bold text-md mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-600">{post.description}</p>
                        </div>

                        {/* Buttons at the bottom */}
                        <div className="flex w-full h-16 rounded-lg px-2 my-2">
                            <button id={`${params.postid}&F`} className="w-1/3 bg-yellow-500 text-white hover:bg-yellow-600">Favorite</button>
                            <button id={`${params.postid}&P`} className="w-1/3 bg-blue-500 text-white hover:bg-blue-700">Purchase</button>
                            <button id={`${params.postid}&Q`} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button>
                        </div>
                    </div>
                </>

                {/* Small Screen */}
                <>
                    {/* Owner Header Bar*/}
                    <div className='flex h-16 w-full items-center p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden'>
                        <p className="text-sm text-gray-600 mb-0 text-left">{post.author}</p>
                    </div>

                    {/* Scrollable Part */}
                    <div className='h-[calc(100vh-8em)] overflow-auto w-full lg:hidden'>
                        {/* Images Display */}
                        <div className='flex items-center justify-center bg-slate-500/50 h-1/2'>
                            <ImageCarousel imageUrls={post.imageList} />
                        </div>
                        {/* Decription */}
                        <div className='p-2'>
                            <h2 className="font-bold text-md mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-600">{post.description}</p>
                        </div>
                    </div>

                    {/* Button Footer Bar */}
                    <div className='flex w-full h-16 lg:hidden'>
                        <button id={`${params.postid}&F`} className="w-1/3 bg-yellow-500 text-white hover:bg-yellow-600">Favorite</button>
                        <button id={`${params.postid}&P`} className="w-1/3 bg-blue-500 text-white hover:bg-blue-700">Purchase</button>
                        <button id={`${params.postid}&Q`} className="w-1/3 bg-red-500 text-white hover:bg-red-700">Query</button>
                    </div>
                </>
            </div>
        </PostModal>
    )
}

export default PostDetailModalPage