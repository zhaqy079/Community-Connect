"use client"

import { useRouter } from "next/navigation"

import { useState } from "react";
import SupportSuggestions from "../SupportSuggestions";
import { type ServiceCategory } from "@/src/types/service";
const MAX_MESSAGE_LENGTH = 300;

export default function InitialChatInput() {

    const router = useRouter();

    const [message, setMessage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const trimmedMessage = message.trim();
    const isEmpty = trimmedMessage.length === 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;
        if (isEmpty) return;

        const initialChatData = {
            message: trimmedMessage,
            categoryId: selectedCategory,
        }

        sessionStorage.setItem("initialChatData", JSON.stringify(initialChatData));

        router.push(`/chat?message=${encodeURIComponent(trimmedMessage)}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-2 w-full max-w-2xl"
        >
            <div className="relative">
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
                {/* TODO: Add input validation and safety checks before API integration. */}
                {message.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        className="absolute right-4 top-3
                        rounded-md px-2 py-1
                        text-xs font-medium text-gray-500
                        hover:bg-gray-100
                        hover:text-gray-800
                      "
                    >
                        Clear
                    </button>

                )}

                {message.length > 0 && (
                    <span
                        className={`
                        absolute bottom-3 right-4
                        text-xs
                        ${message.length >= 270
                                ? "font-medium text-orange-700"
                                : "text-gray-500"
                            }
                      `}
                        aria-live="polite"
                    >
                        {message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                )}
            </div>
            {/* Disclaimer Area */}
            <div className="pb-2">
                <p className="mt-3 text-xs text-gray-600">
                    Please don't include sensitive personal
                    information.
                </p>
            </div>
            <div className="pb-2">
                <details
                    className="mt-3 rounded-xl
                    border border-orange-200
                    bg-[var(--cc-warning)]
                    text-[var(--cc-warning-text)]
                    px-4 py-2.5
                 "
                >
                    <summary
                        className="cursor-pointer
                        rounded-md text-sm
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-[var(--cc-orange)]
                        focus-visible:outline-offset-2
                      "
                    >
                        Need urgent help?
                        <span className="ml-1 font-normal">
                            Call 000 if someone is in immediate danger.
                        </span>
                    </summary>

                    <div className="mt-3 border-[var(--cc-warning-border)] pt-3">
                        <p className="text-sm leading-6 ">
                            Community Connect is not an emergency
                            service.
                        </p>

                        <a
                            href="tel:000"
                            className="
                             mt-2 inline-flex rounded-lg
                            bg-red-700 px-4 py-2
                            font-semibold !text-white
                            hover:bg-red-800 hover:!text-white
                            "
                        >
                            Call 000
                        </a>
                    </div>
                </details>
            </div>

            <div className="pb-2">
                <SupportSuggestions
                    onSelect={(category) => {
                        setMessage(category.defaultPrompt);
                        setSelectedCategory(category.id);
                    }
                    }
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