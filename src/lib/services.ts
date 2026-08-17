import type {
  Service,
  ServiceCategory
} from "../types/service";

import youngCarerSupportData from
  "../data/services/young-carer-support.json";

import saYouthWeekData from
  "../data/services/sa-youth-week.json";

import mayfsData from
  "../data/services/mayfs.json";

import youthJusticeData from
  "../data/services/youth-justice-services.json";

// Test Dataset young-carer-support.json 
const youngCarerSupport =
  youngCarerSupportData as Service;

// Test Dataset sa-youth-week.json 
const saYouthWeek =
  saYouthWeekData as Service;

// Test Dataset mayfs.json
const mayfs =
  mayfsData as Service;

// Test Dataset mayfs.json
const youthJustice =
  youthJusticeData as Service;

export const services: Service[] = [
  youngCarerSupport,
  saYouthWeek,
  mayfs,
  youthJustice
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceById(
  id: string
): Service | undefined {
  return services.find(
    service => service.id === id
  );
}

export function getServiceBySlug(
  slug: string
): Service | undefined {
  return services.find(
    service => service.slug === slug
  );
}

export function getServicesByCategory(
  category: ServiceCategory
): Service[] {
  return services.filter(service =>
    service.categories.includes(category)
  );
}

export function getActiveServices(): Service[] {
  return services.filter(
    service =>
      service.availabilityStatus === "active" ||
      service.availabilityStatus === "seasonal"
  );
}

export function getServicesByNeedTags(
  needTags: string[]
): Service[] {
  return services
    .map(service => {
      const score = service.needTags.filter(tag =>
        needTags.includes(tag)
      ).length;

      return {
        service,
        score
      };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.service);
}