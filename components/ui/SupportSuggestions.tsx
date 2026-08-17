"use client";

type SupportSuggestion = {
    id: string;
    label: string;
};

type SupportSuggestionsProps = {
    onSelect?: (suggestion: SupportSuggestion) => void;
};

// TODO: Align with Elenor on service categories the app focuses on.
// Should consolidate into a constant file for easier management and modification.
const suggestions: SupportSuggestion[] = [
    { id: "housing", label: "Housing support" },
    { id: "concessions", label: "Concessions" },
    { id: "carers", label: "Carer support" },
    { id: "aged-care", label: "Aged care" },
    { id: "financial", label: "Financial assistance" },
];

export default function SupportSuggestions({
    onSelect
}: SupportSuggestionsProps) {
    return (
        <div className="pt-2 w-full max-w-2xl">
            <p className="mb-3 text-sm font-medium text-gray-600">
                Popular support topics
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