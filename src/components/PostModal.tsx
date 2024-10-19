"use client";

import React, { useState } from "react";
// import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PostModal({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const router = useRouter();
    console.log("The Modal Loaded");

    // Function to handle closing the modal and navigating back
    const handleClose = () => {
        console.log("The Modal Closed");
        setIsOpen(false); // Close the modal
        router.back(); // Navigate to the previous page
    };

    return (
        <div
            className={`top-0 inset-0 z-50 flex items-center justify-center backdrop-opacity-40 bg-[#ded0b2]/70 ${isOpen ? 'block' : 'hidden'}`}
            onClick={handleClose} // Close the modal when clicking the backdrop
        >
            <div
                className="w-full h-full lg:w-[80vw] lg:h-[90vh] lg:mx-[10vw] lg:my-[5vh] lg:rounded-lg lg:shadow-2xl border border-[#FFFFFF] bg-[#FFFFFF] dark:bg-[#FFFFFF]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            >
                {/* Close Button (visible on small screens, hidden on large screens) */}
                <button
                    onClick={handleClose}
                    className="absolute h-10 w-10 top-3 right-4 p-2 text-gray-700 bg-gray-50 rounded-full shadow-md hover:bg-gray-200 lg:hidden"
                >
                    &#x2715; {/* Unicode for 'X' symbol */}
                </button>

                {/* Modal Body */}
                <div className="overflow-y-auto h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
