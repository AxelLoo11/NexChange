"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PostModal({ children }: { children: React.ReactNode }) {
    const { onClose } = useDisclosure();

    const router = useRouter();
    console.log("The Modal Loaded");

    // Function to handle closing the modal and navigating back
    const handleClose = () => {
        console.log("The Modal Closed");
        onClose(); // Close the modal
        router.back(); // Navigate to the previous page
    };

    return (
        <>
            <Modal
                defaultOpen={true}
                onClose={handleClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="bg-stone-800 text-white">Post Detail</ModalHeader>
                            <ModalBody className="bg-stone-600 border border-yellow-500">
                                {children}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
