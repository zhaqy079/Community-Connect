"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

export default function ChatPage() {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const initialMessage = sessionStorage.getItem("initialChatMessage");

        if (!initialMessage) return;

        setMessages([
            {
                id: 1,
                role: "user",
                content: initialMessage,
            },
            {
                id: 2,
                role: "assistant",
                content: "Thanks for sharing that. I can help you find support services that may be relevant to your situation.",
            }
        ])

        sessionStorage.removeItem("initialChatMessage")
    }, []);


    return (
        <section className="flex flex-col p-10 items-center justify-center">

            {/* TODO: Add timestamp -> -- hh:mm dd/mm/yyyy -- */}

            {/* TODO: Separate into two UI components later: 1. UserPromtBubble and 2. AssistantResponseBubble */}
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`relative break-words rounded-2xl mb-3 max-w-[80%]
                        ${message.role === "user"
                            ? "ml-auto bg-[var(--cc-teal)] p-4 text-white"
                            : "mr-auto bg-gray-200 p-4"}
                    `}
                >
                    {message.content}

                    {/* Icon to indicate response from Assistant */}
                    {message.role === "assistant" && (
                        <Image src="/logo.svg" alt="" width={30} height={30}
                            className="absolute bottom-2 right-2" />
                    )}
                </div>
            ))}
        </section>
    )
}