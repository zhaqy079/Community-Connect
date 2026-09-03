import { needTagKeywords } from "./needTagKeywordMatcher";

export function extractNeedTags(message: string): string[] {
    const normalisedMessage = message.toLowerCase();

    return Object.entries(needTagKeywords)
        .filter(([, keywords]) =>
            keywords.some(keyword =>
                normalisedMessage.includes(keyword)
            )
        )
        .map(([needTag]) => needTag);
}