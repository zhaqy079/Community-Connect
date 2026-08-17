import {
  describe,
  expect,
  test
} from "vitest";

import {
  getAllServices,
  getServiceById,
  getServicesByCategory
} from "../src/lib/services";

describe("service dataset", () => {
  test("loads at least one service", () => {
    const services = getAllServices();

    expect(services.length).toBeGreaterThan(0);
  });

  test("finds Young Carer Support by ID", () => {
    const service = getServiceById(
      "young-carer-support"
    );

    expect(service).toBeDefined();
    expect(service?.name).toBe(
      "Young Carer Support Service"
    );
  });

  test("filters services by youth category", () => {
    const services = getServicesByCategory(
      "youth-families-carers"
    );

    expect(services).toHaveLength(1);
    expect(services[0].id).toBe(
      "young-carer-support"
    );
  });
});