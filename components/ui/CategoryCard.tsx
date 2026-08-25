import { type CategoryDefinition } from "@/src/data/categories"

type CategoryCardProps = {
    category: CategoryDefinition;
    onSelect?: (category: CategoryDefinition) => void;
};

export default function CategoryCard({
    category,
    onSelect,
}: CategoryCardProps) {

    return (
        <button
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
    )
}