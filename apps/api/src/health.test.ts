import { describe, expect, it } from "vitest";
import { publicHomeSchema } from "@portfolio/shared";

describe("publicHomeSchema", () => {
  it("accepts minimal valid payload shape", () => {
    const sample = {
      profile: {
        name: "Shashwat Dwivedi",
        headline: "Backend",
        summary: "Summary",
        location: "Bangalore",
        email: "techshashwat5@gmail.com",
        phone: null,
        linkedInUrl: null,
        githubUrl: null,
      },
      experience: [],
      projects: [],
      achievements: [],
      skillGroups: [],
      proofMetrics: [],
    };
    expect(publicHomeSchema.parse(sample).profile.name).toBe("Shashwat Dwivedi");
  });
});
