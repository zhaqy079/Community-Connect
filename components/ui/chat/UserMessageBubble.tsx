type UserMessageBubbleProps = {
    content: string;
}

export default function UserMessageBubble({ content }: UserMessageBubbleProps) {
    return (
        <div
            className="relative break-words rounded-2xl mb-3 
                        ml-auto bg-[var(--cc-teal)] p-4 text-white
                        max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]
                    "
        >
            {content}
        </div>
    )
}