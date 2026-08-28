"use client";

import { useEffect, useState } from "react";
import UserInput from "@/components/ui/chat/UserInput";

import { type ServiceCategory, Service } from "@/src/types/service";
import { getServicesByCategory } from "@/src/lib/services";

import { type Message } from "@/src/types/chat";
import ChatMessage from "@/components/ui/chat/ChatMessage";

type InitialChatData = {
    message: string;
    categoryId: ServiceCategory | null;
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
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
            </section>

            {/* User prompt/input section */}
            <UserInput />


        </main>
    )
}