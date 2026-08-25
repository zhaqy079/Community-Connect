"use client"

import { useRouter } from "next/navigation"

import { useState } from "react";
import SupportSuggestions from "./SupportSuggestions";

export default function InitialChatInput() {

    const router = useRouter();

    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        // TEMP Implementation
        sessionStorage.setItem("initialChatMessage", trimmedMessage);

        router.push(`/chat?message=${encodeURIComponent(trimmedMessage)}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-2 w-full max-w-2xl"
        >
            <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // TODO: For the placeholder message, maybe we can do random question/phrases - housing, care support, allowances etc.
                placeholder={"e.g I need help with housing..."}
                rows={3}
                className="w-full p-5 rounded-2xl bg-white
                border border-gray-200               
                shadow-lg
                resize-none outline-none                
                focus:border-[var(--cc-teal)] focus:ring-2 focus:ring-[var(--cc-teal)]/20
                "
            />

            <div className="pb-2">
                <SupportSuggestions
                    onSelect={(category) => setMessage(category.defaultPrompt)}
                />
            </div>

            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    className="rounded-full px-6 py-3 text-white font-bold
                    bg-[var(--cc-teal)]                  
                    transition
                    hover:brightness-90
                    hover:scale-105
                    "
                >
                    {"FIND SUPPORT"}
                </button>
            </div>
        </form>
    );
}