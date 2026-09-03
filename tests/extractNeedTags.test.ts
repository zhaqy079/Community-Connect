import {
    describe,
    expect,
    test
} from "vitest";

import { extractNeedTags } from "../src/lib/matching/extractNeedTags";

const extractSampleCases = [
    {
        description: "rent support",
        message: "I'm struggling with rent",
        expectedTags: ["rent-support"]
    },
    {
        description: "young carer support",
        message: "I'm a young carer and I'm struggling at school",
        expectedTags: [
            "young-carer",
            "school-support"
        ]
    },
    {
        description: "electricity disconnection",
        message: "I'm worried my electricity will be disconnected",
        expectedTags: [
            "risk-of-disconnection"
        ]
    },
] as const;

describe("need tag extraction", () => {
    test.each(extractSampleCases)(
        "extracts tags for $description",
        ({ message, expectedTags }) => {
            const tags = extractNeedTags(message);

            expect(tags).toEqual(
                expect.arrayContaining([...expectedTags])
            );
        }
    );

    test("returns no tags for an unrelated message", () => {
        const tags = extractNeedTags(
            "I want to learn how to bake a cake"
        );

        expect(tags).toHaveLength(0);
    });

    test("matches keywords regardless of case", () => {
        const tags = extractNeedTags(
            "I'M STRUGGLING WITH RENT"
        );

        expect(tags).toContain("rent-support");
    });
});