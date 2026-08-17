"use client"

import { useRouter } from "next/navigation"

export default function ChatInput() {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const textarea = form.elements.namedItem("message") as HTMLTextAreaElement;

        const message = textarea.value.trim();

        if (!message) return;

        router.push(`/chat?message=${encodeURIComponent(message)}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-2 w-full max-w-2xl"
        >
            <textarea
                name="message"
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

            <div className="mt-2 flex justify-end">
                <button
                    type="submit"
                    className="rounded-xl px-6 py-3 text-white font-bold
                    bg-[var(--cc-teal)]                  
                    transition
                    hover:brightness-90
                    "
                >
                    {"FIND SUPPORT"}
                </button>
            </div>
        </form>
    );
}