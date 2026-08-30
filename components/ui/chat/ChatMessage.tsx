import UserMessageBubble from "./UserMessageBubble";
import AssistantMessageBubble from "./AssistantMessageBubble";
import type { Message } from "@/src/types/chat";

type ChatMessageProps = {
    message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
    if (message.role === "user") {
        return <UserMessageBubble content={message.content} />;
    }

    return (
        <AssistantMessageBubble
            content={message.content}
            services={message.services}
        />
    );
}