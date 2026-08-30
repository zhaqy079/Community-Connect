"use client";

import { categories, type CategoryDefinition } from "@/src/data/categories";
import CategoryCard from "./CategoryCard";

type SupportSuggestionsProps = {
    onSelect?: (category: CategoryDefinition) => void;
}

export default function SupportSuggestions({
    onSelect
}: SupportSuggestionsProps) {
    return (
        <div className="pt-2 w-full max-w-2xl">
            <p className="mb-3 text-sm font-medium text-gray-600">
                Or browse by topic
            </p>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}