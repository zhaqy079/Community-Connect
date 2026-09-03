import { extractNeedTags } from "./extractNeedTags";
import { getServicesByNeedTags } from "../services";
import { Service } from "@/src/types/service";

export function matchServices(message: string): Service[] {
    const needTags = extractNeedTags(message);

    return getServicesByNeedTags(needTags);
}