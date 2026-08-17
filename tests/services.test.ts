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

describe("service dataset", () => {
  test("loads at least one service", () => {
    const services = getAllServices();

    expect(services).toHaveLength(2);
  });

  test("finds Young Carer Support by ID", () => {
    const service = getServiceById(
      "young-carer-support"
    );

    expect(service).toBeDefined();
    expect(service?.name).toBe(
      "Young Carer Support Service"
    );

    expect(service?.resourceType).toBe(
      "service"
    );
  });

  test("finds SA Youth Week by ID", () => {
    const service = getServiceById(
      "sa-youth-week"
    );

    expect(service).toBeDefined();
    expect(service?.name).toBe(
      "SA Youth Week"
    );
    expect(service?.resourceType).toBe(
      "event"
    );
  });

  test("finds SA Youth Week by slug", () => {
    const service = getServiceBySlug(
      "sa-youth-week"
    );

    expect(service).toBeDefined();
    expect(service?.id).toBe(
      "sa-youth-week"
    );
  });

  test("filters both resources by youth category", () => {
    const services = getServicesByCategory(
      "youth-families-carers"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toContain(
      "young-carer-support"
    );

    expect(ids).toContain(
      "sa-youth-week"
    );

    expect(services).toHaveLength(2);
  });

  test("includes both resources in community support", () => {
    const services = getServicesByCategory(
      "community-support"
    );

    const ids = services.map(
      service => service.id
    );

    expect(ids).toEqual(
      expect.arrayContaining([
        "young-carer-support",
        "sa-youth-week"
      ])
    );
  });

  test("returns active and seasonal resources", () => {
    const services = getActiveServices();

    const ids = services.map(
      service => service.id
    );

    expect(ids).toContain(
      "young-carer-support"
    );

    expect(ids).toContain(
      "sa-youth-week"
    );
  });

  test("matches Young Carer Support using caring tags", () => {
    const services = getServicesByNeedTags([
      "young-carer",
      "caring-responsibilities",
      "school-support"
    ]);

    expect(services[0].id).toBe(
      "young-carer-support"
    );
  });

  test("matches SA Youth Week using activity tags", () => {
    const services = getServicesByNeedTags([
      "youth-activities",
      "community-participation",
      "arts-and-culture"
    ]);

    expect(services[0].id).toBe(
      "sa-youth-week"
    );
  });

  test("returns no matches for unrelated tags", () => {
    const services = getServicesByNeedTags([
      "energy-bills"
    ]);

    expect(services).toHaveLength(0);
  });
});