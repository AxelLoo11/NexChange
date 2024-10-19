import Link from "next/link";
import React from 'react';
import Image from 'next/image'
import { Post } from "@/models";

const FeedCard = ({ post }: { post: Post }) => {
    return (
        <Link href={`/explore/${post.postId}`} className="hover:shadow-lg">
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="flex items-center w-full px-1">
                    <Image 
                        src={`/images/${post.postSeller.sellerAvatarURL}`} 
                        alt="Owner Avatar"
                        className="p-1 rounded-full"
                        width={40}
                        height={40}
                    />
                    <p className="text-sm px-3">{post.postSeller.sellerName}</p>
                </div>
                <img
                    src={post.postShortcutURL}
                    alt="Post"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="font-bold text-md mb-2">{post.postTitle}</h2>
                    <p className="text-sm text-gray-600">{post.postName}</p>
                    <p className="w-full flex text-md text-gray-600 justify-end">{post.postPrice}</p>
                </div>
            </div>
        </Link>
    );
}

export default FeedCard;