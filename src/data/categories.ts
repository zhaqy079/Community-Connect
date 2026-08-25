import type { ServiceCategory } from "../types/service";

export type CategoryDefinition = {
  id: ServiceCategory;
  label: string;
  description: string;
  defaultPrompt: string;
};

export const categories: CategoryDefinition[] = [
  {
    id: "youth-families-carers",
    label: "Youth, Families & Carers",
    description:
      "Find support for young people, families and people with caring responsibilities.",
    defaultPrompt:
      "I need help with support for a young person, my family, or a carer.",
  },
  {
    id: "cost-of-living-concessions",
    label: "Cost of Living & Concessions",
    description:
      "Explore assistance with household bills, concessions and everyday living costs.",
    defaultPrompt:
      "I need help with cost of living assistance or concessions.",
  },
  {
    id: "disability-accessibility",
    label: "Disability & Accessibility",
    description:
      "Find disability, accessibility and independent living support.",
    defaultPrompt:
      "I need help finding disability or accessibility support.",
  },
  {
    id: "housing-homelessness",
    label: "Housing & Homelessness",
    description:
      "Find help with housing, rental assistance or homelessness.",
    defaultPrompt:
      "I need help with housing or homelessness.",
  },
  {
    id: "community-support",
    label: "Community Support",
    description:
      "Connect with community programs, transport and local support services.",
    defaultPrompt:
      "I need help finding community support services.",
  },
];