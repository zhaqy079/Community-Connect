import { type Service } from "@/src/types/service";

type ServiceCardProps = {
    service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <h2 className="font-semibold text-gray-900">
                {service.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
                {service.shortDescription}
            </p>

            <div className="flex justify-end mt-2">
                <a href={service.primaryAction.url} target="_blank" rel="noopener noreferrer"
                    className="
                    inline-flex items-center justify-center
                    rounded-full
                    px-4 py-2 text-sm
                    font-semibold !text-white
                    bg-[var(--cc-teal)]
                    transition
                    hover:brightness-90
                    hover:scale-105"
                >
                    More information
                </a>
            </div>

        </article>
    );
}