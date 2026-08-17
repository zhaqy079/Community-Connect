import {
  describe,
  expect,
  test
} from "vitest";

import {
  getActiveServices,
  getAllServices,
  getServiceById,
  getServiceBySlug,
  getServicesByCategory,
  getServicesByNeedTags
} from "../src/lib/services";


// Only change serviceCases and matchingCases when adding new test item.
const serviceCases = [
  {
    id: "cost-of-living",
    slug: "cost-of-living",
    name: "Cost of Living",
    resourceType: "directory",
    shortName: undefined
  },
  {
    id: "energy-bill-concession",
    slug: "energy-bill-concession",
    name: "Energy Bill Concession",
    resourceType: "concession",
    shortName: undefined
  },
  {
    id: "mhcc",
    slug: "medical-heating-cooling-concession",
    name: "Medical Heating and Cooling Concession",
    resourceType: "concession",
    shortName: "MHCC"
  },
  {
    id: "eeps",
    slug: "emergency-electricity-payment-scheme",
    name: "Emergency Electricity Payment Scheme",
    resourceType: "program",
    shortName: "EEPS"
  },
  {
    id: "young-carer-support",
    slug: "young-carer-support",
    name: "Young Carer Support Service",
    resourceType: "service",
    shortName: undefined
  },
  {
    id: "sa-youth-week",
    slug: "sa-youth-week",
    name: "SA Youth Week",
    resourceType: "event",
    shortName: undefined
  },
  {
    id: "mayfs",
    slug:
      "metropolitan-aboriginal-youth-family-services",
    name:
      "Metropolitan Aboriginal Youth and Family Services",
    resourceType: "service",
    shortName: "MAYFS"
  },
  {
    id: "youth-justice-services",
    slug: "youth-justice-services",
    name: "Youth Justice Services",
    resourceType: "service",
    shortName: undefined
  },
  {
    id: "homeless-connect-sa",
    slug: "homeless-connect-sa",
    name: "Homeless Connect SA",
    resourceType: "service",
    shortName: undefined
  },
  {
    id: "street-connect",
    slug: "street-connect",
    name: "Street Connect",
    resourceType: "program",
    shortName: undefined
  },
  {
    id: "community-connections-program",
    slug: "community-connections-program",
    name: "Community Connections Program",
    resourceType: "program",
    shortName: undefined
  },
  {
    id: "ctsa",
    slug: "community-transport-south-australia",
    name: "Community Transport South Australia",
    resourceType: "service",
    shortName: "CTSA"
  },
  {
    id: "community-centres",
    slug: "community-centres",
    name: "Community Centres",
    resourceType: "directory",
    shortName: undefined
  },
  {
    id: "itc",
    slug: "interpreting-and-translating-centre",
    name: "Interpreting and Translating Centre",
    resourceType: "service",
    shortName: "ITC"
  }
] as const;

const matchingCases = [
  {
    description: "general cost of living support",
    needTags: [
      "household-bills",
      "food-relief",
      "financial-hardship"
    ],
    expectedId: "cost-of-living"
  },
  {
    description: "energy bill assistance",
    needTags: [
      "energy-bills",
      "electricity-bill-support",
      "energy-concession"
    ],
    expectedId: "energy-bill-concession"
  },
  {
    description: "medical heating and cooling costs",
    needTags: [
      "medical-heating-cooling",
      "temperature-sensitive-medical-condition",
      "medical-certification"
    ],
    expectedId: "mhcc"
  },
  {
    description: "electricity disconnection emergency",
    needTags: [
      "electricity-debt",
      "electricity-disconnection",
      "risk-of-disconnection"
    ],
    expectedId: "eeps"
  },
  {
    description: "young carer support",
    needTags: [
      "young-carer",
      "caring-responsibilities",
      "school-support"
    ],
    expectedId: "young-carer-support"
  },
  {
    description: "youth activities",
    needTags: [
      "youth-activities",
      "community-participation",
      "arts-and-culture"
    ],
    expectedId: "sa-youth-week"
  },
  {
    description:
      "Aboriginal youth justice support",
    needTags: [
      "aboriginal-youth-support",
      "youth-justice-support",
      "cultural-connection"
    ],
    expectedId: "mayfs"
  },
  {
    description: "general youth justice support",
    needTags: [
      "case-management",
      "psychology-support",
      "speech-pathology"
    ],
    expectedId: "youth-justice-services"
  },
  {
    description: "homeless support",
    needTags: [
      "homelessness-support",
      "housing-crisis",
      "emergency-accommodation"
    ],
    expectedId: "homeless-connect-sa"
  },
  {
    description: "someone sleeping rough",
    needTags: [
      "rough-sleeping-notification",
      "someone-sleeping-rough",
      "street-outreach"
    ],
    expectedId: "street-connect"
  },
  {
    description: "community connection support",
    needTags: [
      "social-isolation",
      "not-eligible-ndis",
      "not-eligible-my-aged-care"
    ],
    expectedId: "community-connections-program"
  },
  {
    description: "community transport assistance",
    needTags: [
      "community-transport",
      "transport-disadvantage",
      "mobility-barriers"
    ],
    expectedId: "ctsa"
  },
  {
    description: "find a local community centre",
    needTags: [
      "local-community-centre",
      "group-activities",
      "meet-new-people"
    ],
    expectedId: "community-centres"
  },
  {
    description: "interpreting and language support",
    needTags: [
      "language-barrier",
      "interpreter",
      "document-translation"
    ],
    expectedId: "itc"
  }
] as const;


describe("service dataset", () => {
  test("loads all expected services", () => {
    const services = getAllServices();

    expect(services).toHaveLength(
      serviceCases.length
    );
  });

  test.each(serviceCases)(
    "finds $id by ID",
    ({
      id,
      name,
      resourceType,
      shortName
    }) => {
      const service = getServiceById(id);

      expect(service).toBeDefined();
      expect(service?.name).toBe(name);
      expect(service?.resourceType).toBe(
        resourceType
      );

      if (shortName) {
        expect(service?.shortName).toBe(
          shortName
        );
      }
    }
  );

  test.each(serviceCases)(
    "finds $id by slug",
    ({ id, slug }) => {
      const service = getServiceBySlug(
        slug
      );

      expect(service).toBeDefined();
      expect(service?.id).toBe(id);
    }
  );

  test.each(matchingCases)(
    "matches $description",
    ({ needTags, expectedId }) => {
      const services =
        getServicesByNeedTags([...needTags]);

      expect(services.length).toBeGreaterThan(
        0
      );

      expect(services[0].id).toBe(
        expectedId
      );
    }
  );
  // Test Cost of Living service.
  test("includes expected cost of living resources", () => {
    const services = getServicesByCategory(
      "cost-of-living-concessions"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "cost-of-living",
        "energy-bill-concession",
        "mhcc",
        "eeps"
      ])
    );
  });
  // Test MHCC concession fee 
  test("MHCC contains the verified 2026 amount", () => {
    const service = getServiceById(
      "mhcc"
    );

    expect(service).toBeDefined();

    expect(
      service?.availabilityNote
    ).toContain("$291.27");

    expect(service?.lastVerified).toBe(
      "2026-08-17"
    );
  });

  // Test EEPS concession fee
  test("EEPS contains emergency payment details", () => {
    const service = getServiceById("eeps");

    expect(service).toBeDefined();

    expect(
      service?.availabilityNote
    ).toContain("$800");

    expect(
      service?.availabilityNote
    ).toContain("two years");

    expect(
      service?.eligibilityNote
    ).toContain("financial counsellor");

    expect(service?.primaryAction.phone).toBe(
      "1800 007 007"
    );
  });
  // Test "Youth" Related services.
  test("includes expected youth resources", () => {
    const services = getServicesByCategory(
      "youth-families-carers"
    );

    const ids = services.map(
      service => service.id
    );
    expect(ids).toEqual(
      expect.arrayContaining([
        "young-carer-support",
        "sa-youth-week",
        "mayfs",
        "youth-justice-services",
      ])
    );
  });

  test("returns discoverable resources", () => {
    const services = getActiveServices();

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "cost-of-living",
        "energy-bill-concession",
        "young-carer-support",
        "sa-youth-week",
        "mayfs",
        "youth-justice-services",
        "homeless-connect-sa",
        "street-connect",
        "community-connections-program",
        "ctsa",
        "community-centres",
        "itc",
        "mhcc"
      ])
    );
  });

  test("includes expected housing resources", () => {
    const services = getServicesByCategory(
      "housing-homelessness"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toContain(
      "homeless-connect-sa",
    );
  });

  // Test community services 
  test("includes expected community resources", () => {
    const services = getServicesByCategory(
      "community-support"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "community-connections-program",
        "ctsa",
        "community-centres",
        "itc"
      ])
    );
  });
  // Test Disability and accessibility
  test("includes expected accessibility resources", () => {
    const services = getServicesByCategory(
      "disability-accessibility"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "ctsa",
        "itc"
      ])
    );
  });
  test("all IDs are unique", () => {
    const ids = getAllServices().map(
      service => service.id
    );

    expect(new Set(ids).size).toBe(
      ids.length
    );
  });

  test("all slugs are unique", () => {
    const slugs = getAllServices().map(
      service => service.slug
    );

    expect(new Set(slugs).size).toBe(
      slugs.length
    );
  });

  test("all services have HTTPS source URLs", () => {
    for (const service of getAllServices()) {
      expect(service.sourceUrl).toMatch(
        /^https:\/\//
      );
    }
  });

  test("returns no matches for unrelated tags", () => {
    const services = getServicesByNeedTags([
      "pet-grooming"
    ]);

    expect(services).toHaveLength(0);
  });

});