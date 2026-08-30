import Image from "next/image";
import ServiceCard from "@/components/ui/ServiceCard";
import { type Service } from "@/src/types/service";

type AssistantMessageBubbleProps = {
    content: string;
    services?: Service[];
};

export default function AssistantMessageBubble({ content, services }: AssistantMessageBubbleProps) {
    return (
        <div className="relative mr-auto mb-3 
                        break-words rounded-2xl bg-gray-200 p-4 
                        max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]
                        "
        >
            <p>{content}</p>

            {services && services.length > 0 && (
                <div className="mt-3 mb-8 w-full max-w-2xl space-y-3">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}

            <Image
                src="/logo.svg"
                alt="Community Connect Logo"
                width={30}
                height={30}
                className="absolute right-2 bottom-2"
            />
        </div>
    );
}