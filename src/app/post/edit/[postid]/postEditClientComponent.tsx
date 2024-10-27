"use client";

import Navigation from '@/components/Navigation';
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import { Post, PostImage } from '@/models';

export default function PostEditClientComponent({ post }: {
    post: Post;
}) {
    const [title, setTitle] = useState<string>(post.postTitle);
    const [name, setName] = useState<string>(post.postName);
    const [description, setDescription] = useState<string>(post.postDescription || "");
    const [price, setPrice] = useState<number>(post.postPrice);
    const [shortcutURL, setShortcutURL] = useState<string>(post.postShortcutURL);
    const [shortcutFile, setShortcutFile] = useState<File | null>(null);
    const [postImages, setPostImages] = useState<PostImage[]>(post.postImages || []);

    const uploadImageToS3 = async (file: File | null): Promise<string | null> => {
        if (!file) return null;
        try {
            const fileName = file.name;
            const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            const url = `${process.env.NEXT_PUBLIC_S3_URL}/${uuidv4()}${fileExtension}`;

            // Upload the file to S3
            const uploadRes = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type, // Ensure the file type is correct
                },
                body: file,
            });

            if (uploadRes.ok) {
                return url;
            } else {
                throw new Error('Upload failed');
            }
        } catch (uploadError) {
            console.error(uploadError);
            return null;
        }
    };

    const handleInfoSave = async () => {
        const newShortcutURL: string | null = shortcutFile === null ? shortcutURL : await uploadImageToS3(shortcutFile);
        if (newShortcutURL === null) {
            alert("Failed to update post info. Please try again ...");
            return;
        }

        setShortcutURL(newShortcutURL);
        setShortcutFile(null);

        const response = await fetch(`/api/post`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId: post.postId,
                postTitle: title,
                postName: name,
                postDescription: description,
                postPrice: price,
                postShortcutURL: newShortcutURL,
            }),
        });

        if (response.ok) {
            alert('Post Info updated successfully.');
        }
        else alert('Error updating post.');
    };

    const handleShortcutUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const newShortcutURL = URL.createObjectURL(file);
        setShortcutURL(newShortcutURL);
        setShortcutFile(file);
    };

    const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const imageurl: string | null = await uploadImageToS3(file);
        if (imageurl === null) {
            alert("Failed to add new images ...");
            return;
        }

        const response = await fetch(`/api/post/image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post.postId, postImageURL: imageurl }),
            credentials: 'include',
        });

        if (response.ok) {
            const newImage: PostImage = await response.json();
            setPostImages([...postImages, newImage]);
            alert("Add Image Success ...");
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        const response = await fetch(`/api/post/image?postImageId=${imageId}&postId=${post.postId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            setPostImages(postImages.filter((img) => img.postImageId !== imageId));
            alert("Remove Image Success ...");
        } else {
            alert('Failed to delete image.');
        }
    };

    return (
        <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            <div className="p-4 w-full lg:w-[calc(100vw-10rem)] lg:h-[calc(100vh-5rem)] h-[calc(100vh-9rem)] flex flex-col lg:flex-row overflow-auto">
                {/* InfoDiv */}
                <div className="lg:flex-1 p-4 lg:overflow-auto">
                    <div className="space-y-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Post Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Post Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows={5}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Post Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <img src={shortcutURL} alt="Shortcut" className="w-60 h-60 object-cover border rounded-md" />
                        <label className="absolute inset-0 bg-black bg-opacity-50 text-white flex justify-center items-center opacity-0 hover:opacity-100 cursor-pointer">
                            <input type="file" className="hidden" onChange={handleShortcutUpload} />
                            Upload New Image
                        </label>
                    </div>
                    <button onClick={handleInfoSave} className="mt-4 w-full bg-blue-500 text-white rounded p-2">
                        SAVE
                    </button>
                </div>

                {/* ImageDiv */}
                <div className="lg:flex-1 p-4 space-y-2 lg:overflow-auto">
                    {postImages.map((img) => (
                        <div key={img.postImageId} className="flex items-center justify-between">
                            <img src={img.postImageURL} alt="Post Image" className="w-40 h-40 object-cover border rounded-md" />
                            <button
                                onClick={() => handleDeleteImage(img.postImageId)}
                                className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
                            >
                                Remove Image
                            </button>
                        </div>
                    ))}
                    <label className="block w-full text-center bg-gray-200 text-gray-600 p-2 rounded cursor-pointer hover:bg-gray-300">
                        +
                        <input type="file" className="hidden" onChange={handleAddImage} />
                    </label>
                </div>
            </div>
        </div >
    );
}