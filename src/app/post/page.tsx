"use client";

import Navigation from '@/components/Navigation';
import React, { useState } from 'react'

export default function PostProductPage() {
  const userId: string = "user123";

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shortcutImage, setShortcutImage] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);

  const [shortcutImagePreview, setShortcutImagePreview] = useState<string | null>(null);
  const [productImagesPreview, setProductImagesPreview] = useState<string[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortcutImage || productImages.length === 0) {
      alert("Please upload both shortcut image and product images.");
      return;
    }

    // Simulate form data submission logic (API call, etc.)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (shortcutImage) {
      formData.append("shortcutImage", shortcutImage);
    }
    productImages.forEach((image, index) => {
      formData.append(`productImages[${index}]`, image);
    });

    try {
      // Replace this with actual API call
      await fakeSubmit(formData);
      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Error submitting post.");
    }
  };

  // Placeholder for submission function (replace with real API)
  const fakeSubmit = async (formData: FormData) => {
    formData.forEach((value, key) => {
      console.log(`Check submitted data - ${key}:`, value);
    });
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
      <div className='lg:w-40 w-0'>
        <Navigation userId={userId} />
      </div>
      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)] h-[calc(100vh-5rem)] bg-gray-50 overflow-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Post
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
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Shortcut Display Image</label>
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
