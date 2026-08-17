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

import homelessConnectData from
  "../data/services/homeless-connect-sa.json";

import streetConnectData from
  "../data/services/street-connect.json"

import communityConnectionsProgramData from
  "../data/services/community-connections-program.json";

import ctsaData from
  "../data/services/ctsa.json";

import communityCentresData from
  "../data/services/community-centres.json";

import itcData from
  "../data/services/itc.json";


const youngCarerSupport =
  youngCarerSupportData as Service;


const saYouthWeek =
  saYouthWeekData as Service;


const mayfs =
  mayfsData as Service;


const youthJustice =
  youthJusticeData as Service;


const homelessConnect =
  homelessConnectData as Service;


const streetConnect =
  streetConnectData as Service;

const communityConnectionsProgram =
  communityConnectionsProgramData as Service;
const ctsa =
  ctsaData as Service;

const communityCentres =
  communityCentresData as Service;

const itc = itcData as Service;

export const services: Service[] = [
  youngCarerSupport,
  saYouthWeek,
  mayfs,
  youthJustice,
  homelessConnect,
  streetConnect,
  communityConnectionsProgram,
  ctsa,
  communityCentres,
  itc
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