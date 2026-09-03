"use client";

import { useEffect, useState } from "react";
import UserInput from "@/components/ui/chat/UserInput";

import { type ServiceCategory, Service } from "@/src/types/service";
import { getServicesByCategory } from "@/src/lib/services";
import { matchServices } from "@/src/lib/matching/matchServices";

import { type Message } from "@/src/types/chat";
import ChatMessage from "@/components/ui/chat/ChatMessage";

type InitialChatData = {
    message: string;
    categoryId: ServiceCategory | null;
};

const CHAT_MESSAGES_KEY = "chatMessages";
const INITIAL_CHAT_DATA_KEY = "initialChatData";

export default function ChatPage() {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        // First, check whether an existing conversation has been saved.
        const storedMessages = sessionStorage.getItem(CHAT_MESSAGES_KEY);

        if (storedMessages) {
            const parsedMessages: Message[] = JSON.parse(storedMessages);
            setMessages(parsedMessages);
            return;
        }

        // If there is no existing conversation then create it from the landing page (initial chat input) data.
        const storedInitialData = sessionStorage.getItem(INITIAL_CHAT_DATA_KEY);

        if (!storedInitialData) return;

        const initialChatData: InitialChatData = JSON.parse(storedInitialData);

        const matchedServices = initialChatData.categoryId
            ? getServicesByCategory(initialChatData.categoryId)
            : matchServices(initialChatData.message);

        const initialMessages: Message[] = [
            {
                id: 1,
                role: "user",
                content: initialChatData.message,
            },
            {
                id: 2,
                role: "assistant",
                content:
                    matchedServices.length > 0
                        ? `Thank you for sharing the information. I found ${matchedServices.length} services that may be of help.`
                        : "Thanks for sharing that. Can you please tell me a little bit more about the support you need?",
                services:
                    matchedServices.length > 0
                        ? matchedServices
                        : undefined,
            },
        ];

        setMessages(initialMessages);

        // Save the newly created conversation.
        sessionStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(initialMessages));

        sessionStorage.removeItem(INITIAL_CHAT_DATA_KEY);
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
            {/* TODO: in new branch add function for user to send additional prompt 
                & add message to history with assistant's follow up response */}
            <UserInput />


        </main>
    )
}