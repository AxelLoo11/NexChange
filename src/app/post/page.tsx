"use client";

import Navigation from '@/components/Navigation';
import { useUser } from '@/context/UserContext';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid"

export default function PostProductPage() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.userId || "";
  const username = user?.userNickName || "";
  const useravatar = user?.userAvatarURL || "01.jpg"; // given a default url ...

  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [shortcutImage, setShortcutImage] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);

  const [shortcutImagePreview, setShortcutImagePreview] = useState<string | null>(null);
  const [productImagesPreview, setProductImagesPreview] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleShortcutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setShortcutImage(file);
      setShortcutImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleProductImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setProductImages((prevImages) => [...prevImages, ...selectedFiles]);

      // Generate preview URLs for each selected image
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setProductImagesPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeShortcutImage = () => {
    setShortcutImage(null);
    setShortcutImagePreview(null);
  };

  const removeProductImage = (index: number) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setProductImagesPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  // upload images to s3 and get the url before create post
  const handleImageUpload = async (files: File[]): Promise<string[] | null> => {
    // Upload each file to its presigned URL
    const uploadPromises = files.map(async (file) => {
      const fileName = file.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
      const url = `${process.env.NEXT_PUBLIC_S3_URL}/${uuidv4()}${fileExtension}`;

      // Upload the file to S3
      const uploadRes = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,  // Ensure the file type is correct
        },
        body: file,
      });

      if (uploadRes.ok) {
        // console.log("The image url is: ", url);
        return url;
      } else {
        throw new Error('Upload failed');
      }
    });

    try {
      const uploadedURLs = await Promise.all(uploadPromises);
      return uploadedURLs;
    } catch (uploadError) {
      console.log(uploadError);
      setError("Upload failed ...");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortcutImage || productImages.length === 0) {
      alert("Please upload both shortcut image and product images.");
      return;
    }

    try {
      // Step 1: Upload images and get their URLs
      const shortcutUrl: string[] | null = await handleImageUpload([shortcutImage]); // Upload shortcut image
      const productImageUrls: string[] | null = await handleImageUpload(productImages); // Upload product images

      if (shortcutUrl === null || productImageUrls === null) {
        alert("Failed to upload images. Please try again!");
        return;
      }

      // Step 2: Prepare the post data
      const postData = {
        userId: userId, // Assuming you have userId from state or context
        postTittle: title, // Assuming postTitle from useState
        postName: name, // Assuming postName from useState
        postDescription: description, // Assuming postDescription from useState
        postPrice: price, // Assuming postPrice from useState
        postShortcutURL: shortcutUrl[0], // Only one shortcut image URL
        postImages: productImageUrls.map((url) => ({
          postImageURL: url, // Each product image URL
        })),
        postSeller: {
          sellerName: username,
          sellerAvatarURL: useravatar,
        }
      };

      // Step 3: Send the POST request to create the post
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        credentials: 'include', // This includes cookies in the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create the post.');
      }

      // alert('Post created successfully!');
      router.push('/explore');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the post. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>
      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)] h-[calc(100vh-5rem)] bg-gray-50 overflow-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Publish New Post
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
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

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Post Shortcut Display Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleShortcutImageUpload}
              className="w-full"
              required
            />
            {shortcutImagePreview && (
              <div className="mt-4 relative w-full">
                <img
                  src={shortcutImagePreview}
                  alt="Shortcut Preview"
                  className="w-32 h-32 object-cover border rounded-md"
                />
                <button
                  type="button"
                  onClick={removeShortcutImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 h-8 w-8"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImagesUpload}
              multiple
              className="w-full"
              required
            />
            {productImagesPreview.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                {productImagesPreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                      className="w-32 h-32 object-cover border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeProductImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 h-8 w-8"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
