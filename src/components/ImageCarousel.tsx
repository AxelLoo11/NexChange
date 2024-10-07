"use client";

import { useState } from 'react';

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative group w-full h-full">
            <img
                src={imageUrls[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
            />

            {/* Pagination Arrows (show on hover) */}
            <button
                onClick={prevImage}
                className="w-8 h-8 absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            >
                &#11207; {/* Left Arrow */}
            </button>

            <button
                onClick={nextImage}
                className="w-8 h-8 absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            >
                &#11208; {/* Right Arrow */}
            </button>

            {/* Pagination Dots (show on hover) */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {imageUrls.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-yellow-500' : 'bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
