"use client"

import { useRouter } from "next/navigation"

import { useState } from "react";
import SupportSuggestions from "./SupportSuggestions";
const MAX_MESSAGE_LENGTH = 300; // Limit 1-3 sentences, no more :( 

export default function ChatInput() {

    const router = useRouter();

    const [message, setMessage] = useState("");
    const trimmedMessage = message.trim();
    const isEmpty = trimmedMessage.length === 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!trimmedMessage) return;
        if (isEmpty) return;

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
                maxLength={MAX_MESSAGE_LENGTH}
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
            {/* Message Validation Area  */}
            <div className="mt-1 flex min-h-6 items-center justify-between px-1">
                {message.length > 0 ? (
                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Clear
                    </button>
                ) : (
                    <span />
                )}

                <span
                    className="text-sm text-gray-500"
                    aria-live="polite"
                >
                    {message.length}/{MAX_MESSAGE_LENGTH}
                </span>
            </div>

            <div className="pb-2">
                <SupportSuggestions
                    onSelect={(suggestion) => setMessage(suggestion.prompt)}
                />
            </div>

            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    disabled={isEmpty}
                    className="rounded-full px-6 py-3 text-white font-bold
                    bg-[var(--cc-teal)]                  
                    transition
                    hover:brightness-90
                    hover:scale-105
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    disabled:hover:brightness-100
                    "
                >
                    {"FIND SUPPORT"}
                </button>
            </div>
        </form>
    );
}