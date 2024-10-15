import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
import { fetchPostInfo } from '@/app/_lib';
import React from 'react';
import { cookies } from 'next/headers';


async function PostDetailPage({ params }: { params: { postid: string } }) {
    const cookieStore = cookies();

    const userId = cookieStore.get('userid')?.value || "";
    const post = await fetchPostInfo(params.postid);

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