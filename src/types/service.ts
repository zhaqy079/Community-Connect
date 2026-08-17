export type ServiceCategory =
  | "youth-families-carers"
  | "cost-of-living-concessions"
  | "disability-accessibility"
  | "housing-homelessness"
  | "community-support";

export type ResourceType =
  | "service"
  | "program"
  | "concession"
  | "event"
  | "grant"
  | "directory"
  | "information";

export type AvailabilityStatus =
  | "active"
  | "seasonal"
  | "closed"
  | "coming-soon"
  | "unknown";

export type DeliveryMethod =
  | "online"
  | "phone"
  | "in-person"
  | "home-visit"
  | "community-location";

export type CostType =
  | "free"
  | "subsidised"
  | "varies"
  | "not-applicable"
  | "unknown";

export type ServiceContact = {
  website: string;
  phone?: string;
  email?: string;
};

export type AgeRange = {
  minimum?: number;
  maximum?: number;
};

export type PrimaryAction = {
  label: string;
  url?: string;
  phone?: string;
};

export type Service = {
  // Identity and routing
  id: string;
  slug: string;
  name: string;
  provider: string;

  // Classification
  resourceType: ResourceType;
  categories: ServiceCategory[];
  needTags: string[];

  // Card content
  shortDescription: string;
  plainEnglishSummary: string;

  // Who and where
  ageRange?: AgeRange;
  audience: string[];
  regions: string[];

  // What is provided
  supportTypes: string[];
  deliveryMethods: DeliveryMethod[];
  cost: CostType;

  // Availability
  availabilityStatus: AvailabilityStatus;
  availabilityNote?: string;

  // Access and contact
  contact: ServiceContact;
  primaryAction: PrimaryAction;

  // Responsible information
  eligibilityNote: string;
  sourceUrl: string;
  lastVerified: string;

  // Optional detailed content - Sprint2 
  featuredDetails?: FeaturedServiceDetails;
};

export type FeaturedServiceDetails = {
  overview: string;
  whyItMayHelp: string[];
  whoItMayHelp: string[];
  supportAvailable: string[];
  whatToPrepare: string[];

  howToAccess: {
    step: number;
    title: string;
    description: string;
  }[];

  relatedServiceIds: string[];

  frequentlyAskedQuestions: {
    question: string;
    answer: string;
  }[];
};