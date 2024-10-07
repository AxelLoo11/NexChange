"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
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
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            radius="lg"
            classNames={{
                backdrop: "bg-[#ded0b2]/70 backdrop-opacity-40",
                base: "border-[#FFFFFF] bg-[#FFFFFF] dark:bg-[#FFFFFF]",
            }}
            hideCloseButton={true}
            scrollBehavior={"inside"}
        >
            <ModalContent className="w-full h-full lg:w-[80vw] lg:h-[90vh] lg:mx-[10vw] lg:my-[5vh] lg:rounded-lg lg:shadow-2xl">
                {() => (
                    <>
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute h-10 w-10 top-3 right-4 p-2 text-gray-700 bg-gray-50 rounded-full shadow-md hover:bg-gray-200 lg:hidden"
                        >
                            &#x2715; {/* Unicode for 'X' symbol */}
                        </button>
                        <ModalBody className="h-full w-full">
                            {children}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
