import Link from "next/link";
import React from 'react';
import { RefPost } from "@/models";

const RefPostCard = ({ post }: { post: RefPost }) => {
    return (
        <Link href={`/explore/${post.refPostId}`} className="hover:shadow-lg">
            <div className="bg-white shadow rounded overflow-hidden">
                <img
                    src={post.refPostShortCutURL}
                    alt="Post"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="font-bold text-md mb-2">{post.refPostTitle}</h2>
                    <p className="text-sm text-gray-600 justify-end">$ {post.refPostPrice}</p>
                </div>
            </div>
        </Link>
    );
}

export default RefPostCard;