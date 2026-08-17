"use client";

type SupportSuggestion = {
    id: string;
    label: string;
    prompt: string;
};

type SupportSuggestionsProps = {
    onSelect?: (suggestion: SupportSuggestion) => void;
};

// TODO: Align with Elenor on service categories the app focuses on.
// Should consolidate into a constant file for easier management and modification.
const suggestions: SupportSuggestion[] = [
    {
        id: "housing",
        label: "Housing & Homelessness",
        prompt: "I need help with housing or homelessness.",
    },
    {
        id: "cost-of-living",
        label: "Cost of living",
        prompt: "I need help with cost of living assistance.",
    },
    {
        id: "youth-families-carers",
        label: "Youth, families & carers",
        prompt: "I need help with support for a young person, my family, or a carer.",
    },
    {
        id: "aged-care",
        label: "Aged care",
        prompt: "I need help finding aged care services.",
    },
    {
        id: "disability",
        label: "Disability & accessibility",
        prompt: "I need help finding disability or accessibility support.",
    },
    {
        id: "community-support",
        label: "Community support",
        prompt: "I need help finding community support services.",
    },
];

export default function SupportSuggestions({
    onSelect
}: SupportSuggestionsProps) {
    return (
        <div className="pt-2 w-full max-w-2xl">
            <p className="mb-3 text-sm font-medium text-gray-600">
                or choose a support area:
            </p>

            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        type="button"
                        onClick={() => onSelect?.(suggestion)}
                        className="cursor-pointer px-4 py-2
                        rounded-full border border-gray-300 bg-white
                        text-sm text-gray-700                       
                        transition duration-200
                        hover:scale-105
                        hover:border-[var(--cc-teal)]
                        hover:bg-[var(--cc-teal)]/10
                        hover:text-[var(--cc-teal)]
                        "
                    >
                        {suggestion.label}
                    </button>
                ))}
            </div>
        </div>
    );
}