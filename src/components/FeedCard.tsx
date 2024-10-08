import { PostInfo } from "@/models/postInfo";
import Link from "next/link";
import React from 'react';
import Image from 'next/image'

const FeedCard = ({ post }: { post: PostInfo }) => {
    return (
        <Link href={`/explore/${post.id}`} className="hover:shadow-lg">
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="flex items-center w-full px-1">
                    <Image 
                        src={`/images/${post.authorAvatar}.jpg`} 
                        alt="Owner Avatar"
                        className="p-1 rounded-full"
                        width={40}
                        height={40}
                    />
                    <p className="text-sm px-3">{post.author}</p>
                </div>
                <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="font-bold text-md mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-600">{post.description}</p>
                </div>
            </div>
        </Link>
    );
}

export default FeedCard;