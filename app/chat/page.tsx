"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UserInput from "@/components/ui/UserInput";

import { type ServiceCategory } from "@/src/types/service";
import { getServicesByCategory } from "@/src/lib/services";

type InitialChatData = {
    message: string;
    categoryId: ServiceCategory | null;
};

type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

export default function ChatPage() {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("initialChatData");

        if (!storedData) return;

        const initialChatData: InitialChatData = JSON.parse(storedData);

        const mathcedServices = initialChatData.categoryId
            ? getServicesByCategory(initialChatData.categoryId) : [];

        console.log(mathcedServices);

        setMessages([
            {
                id: 1,
                role: "user",
                content: initialChatData.message,
            },
            {
                id: 2,
                role: "assistant",
                content: mathcedServices.length > 0
                    ? `Thanks for sharing that! I have found ${mathcedServices.length} services in this support area.`
                    : "Thanks for sharing that. Tell me a little more about the support you need",
            }
        ])

        sessionStorage.removeItem("initialChatData")
    }, []);


    return (
        <main className="flex h-[calc(100dvh-90px)] min-h-0 flex-col px-10 pt-6">

            {/* TODO: Add timestamp -> -- hh:mm dd/mm/yyyy -- */}
            <section className="flex-1 min-h-0 overflow-y-auto">
                {/* TODO: Separate into two UI components later: 1. UserPromtBubble and 2. AssistantResponseBubble */}
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`relative break-words rounded-2xl mb-3 max-w-[85%]
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

            {/* User prompt/input section */}
            <UserInput />


        </main>
    )
}