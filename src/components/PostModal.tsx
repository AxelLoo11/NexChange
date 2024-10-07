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
            backdrop="blur"
            onClose={handleClose}
            radius="lg"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#ded0b2]/50 backdrop-opacity-40",
                base: "border-[#ded0b2] bg-[#d0ad61] dark:bg-[#d0ad61] text-[#83621b]",
            }}
            hideCloseButton={true}
            scrollBehavior={"inside"}
        >
            <ModalContent className="w-[70vw] h-[90vh] mx-[15vw] my-[5vh] rounded-lg shadow-2xl">
                {() => (
                    <>
                        <ModalBody className="h-full p-4 w-full">
                            {children}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
