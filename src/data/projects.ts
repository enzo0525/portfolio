import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Skate AI",
    description:
      "ai skateboarding coach — film a trick, get a frame-by-frame breakdown of what went wrong and how to fix it",
    tech: "ios, swiftui, supabase edge functions, openai, vision",
    url: "https://getskateai.com",
    year: 2026,
  },
  {
    title: "TMRW",
    description:
      "planner for iphone and mac — tasks, events and habits on one calendar, offline-first, with an mcp server so ai assistants can manage your day",
    tech: "ios, macos, swiftui, swiftdata, supabase, mcp",
    url: "https://tmrwplanner.app",
    year: 2026,
  },
  {
    title: "Paloma",
    description: "location reminders for iphone — type a reminder like you'd say it",
    tech: "ios, swiftui",
    url: "https://getpaloma.app",
    year: 2026,
  },
  {
    title: "LarpMaxxing",
    description:
      "ai photo studio — upload your face, describe a scene, get photorealistic images",
    tech: "ios, swiftui, supabase, ai image generation",
    url: "https://larpmaxxingapp.com",
    year: 2026,
  },
];
