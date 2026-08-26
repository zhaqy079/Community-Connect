"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UserInput from "@/components/ui/UserInput";

import { type ServiceCategory, Service } from "@/src/types/service";
import { getServicesByCategory } from "@/src/lib/services";

type InitialChatData = {
    message: string;
    categoryId: ServiceCategory | null;
};

type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
    services?: Service[];
};

export default function ChatPage() {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("initialChatData");

        if (!storedData) return;

        const initialChatData: InitialChatData = JSON.parse(storedData);

        const matchedServices = initialChatData.categoryId
            ? getServicesByCategory(initialChatData.categoryId) : [];

        console.log(matchedServices);

        // Set initial meesages and corresponding responses.
        const initialMessages: Message[] = [
            {
                id: 1,
                role: "user",
                content: initialChatData.message,
            },
            {
                id: 2,
                role: "assistant",
                content: matchedServices.length > 0
                    ? `Thank you for sharing the information. I found ${matchedServices.length} services that may be of help.`
                    : "Thanks for sharing that. Can you please tell me a little bit more about the support you need?",
                services: matchedServices.length > 0 ? matchedServices : undefined,
            }
        ];

        setMessages(initialMessages);

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

                        {message.services && message.services.length > 0 && (
                            <div className="mt-3 mr-auto w-full max-w-2xl space-y-3 mb-8">
                                {/* TODO: Design a reusable expandable UI card component to display Service details */}
                                {message.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        <h2 className="font-semibold text-gray-900">
                                            {service.name}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-600">
                                            {service.shortDescription}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

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