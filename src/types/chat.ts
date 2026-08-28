import { type Service } from "./service";

export type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
    services?: Service[];
};