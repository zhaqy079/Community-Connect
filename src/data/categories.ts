import type { ServiceCategory } from "../types/service";

export type CategoryDefinition = {
  id: ServiceCategory;
  label: string;
  description: string;
};

export const categories: CategoryDefinition[] = [
  {
    id: "youth-families-carers",
    label: "Youth, Families & Carers",
    description:
      "Support for young people, families and people with caring responsibilities."
  },
  {
    id: "cost-of-living-concessions",
    label: "Cost of Living & Concessions",
    description:
      "Explore assistance with household bills and everyday living costs."
  },
  {
    id: "disability-accessibility",
    label: "Disability & Accessibility",
    description:
      "Find disability, independent living and accessibility support."
  },
  {
    id: "housing-homelessness",
    label: "Housing & Homelessness",
    description:
      "Find help with housing instability and homelessness."
  },
  {
    id: "community-support",
    label: "Community Support",
    description:
      "Connect with community activities, transport and local support."
  }
];