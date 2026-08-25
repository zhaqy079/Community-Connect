"use client";

import { categories, type CategoryDefinition } from "@/src/data/categories";

type SupportSuggestionsProps = {
    onSelect?: (category: CategoryDefinition) => void;
};


export default function SupportSuggestions({
    onSelect
}: SupportSuggestionsProps) {
    return (
        <div className="pt-2 w-full max-w-2xl">
            <p className="mb-3 text-sm font-medium text-gray-600">
                or choose a support area:
            </p>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onSelect?.(category)}
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
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
}