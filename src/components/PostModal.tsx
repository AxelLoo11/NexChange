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
            className="flex flex-col"
            radius="lg"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            }}
            hideCloseButton={true}
            scrollBehavior={"inside"}
        >
            <ModalContent className="w-[70vw] h-[80vh] mx-[15vw] my-[10vh] rounded-lg">
                {() => (
                    <>
                        <ModalBody className="h-full">
                            {children}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
