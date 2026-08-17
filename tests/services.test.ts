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
  }
] as const;

const matchingCases = [
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

  test("includes expected youth resources", () => {
    const services = getServicesByCategory(
      "youth-families-carers"
    );

    const ids = services.map(
      service => service.id
    );
    // Update II 
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
        "young-carer-support",
        "sa-youth-week",
        "mayfs",
        "youth-justice-services",
        "homeless-connect-sa",
        "street-connect"
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

  test("includes expected community resources", () => {
    const services = getServicesByCategory(
      "community-support"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "community-connections-program"
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
      "energy-bills"
    ]);

    expect(services).toHaveLength(0);
  });

});