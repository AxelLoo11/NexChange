import { PostInfo } from "@/models/postInfo";
import Link from "next/link";
import React from 'react';

const FeedCard = ({ post }: { post: PostInfo }) => {
    return (
        <Link href={`/explore/${post.id}`} className="hover:shadow-lg">
            <div className="bg-white shadow rounded overflow-hidden">
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
        </Link>
    );
}

export default FeedCard;