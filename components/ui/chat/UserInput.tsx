"use client"

import { useState } from "react";


export default function UserInput() {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-2 w-full max-w-2xl"
        >
            <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={"Type in here ..."}
                rows={3}
                className="w-full p-5 rounded-2xl bg-white
                border border-gray-200               
                shadow-lg
                resize-none outline-none                
                focus:border-[var(--cc-teal)] focus:ring-2 focus:ring-[var(--cc-teal)]/20
                "
            />

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
                    {"Ask"}
                </button>
            </div>
        </form>
    );
}