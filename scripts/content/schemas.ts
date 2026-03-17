import { z } from "zod";

export const nowSchema = z.object({
  reading: z.object({
    title: z.string(),
    author: z.string(),
    reaction: z.string(),
  }),
  listening: z.object({
    spotifyEmbedUrl: z.string().url(),
  }),
  training: z.object({
    focus: z.string(),
    prLabel: z.string(),
    prValue: z.number(),
    prUnit: z.string(),
  }),
  learning: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        percent: z.number().min(0).max(100),
      })
    ),
  }),
});

const rateEveryDaysStatSchema = z.object({
  baseline: z.number(),
  baselineDate: z.string(),
  rateEveryDays: z.number().positive(),
});

const hoursCodedStatSchema = z.object({
  baseline: z.number(),
  baselineDate: z.string(),
  rateEveryHours: z.number().positive(),
});

export const statsSchema = z.object({
  birthDate: z.string(),
  booksRead: rateEveryDaysStatSchema,
  energyDrinks: rateEveryDaysStatSchema,
  hoursCoded: hoursCodedStatSchema,
});

export const projectsSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    github: z.string(),
    live: z.string().nullable(),
    icon: z.string(),
  })
);

export const usesSchema = z.array(
  z.object({
    label: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        url: z.string().url().optional(),
      })
    ),
  })
);

export const gallerySchema = z.array(
  z.object({
    src: z.string(),
    blurDataURL: z.string().optional(),
    objectPosition: z.string().optional(),
  })
);
