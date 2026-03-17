import { readFileSync } from "fs";
import { resolve } from "path";
import { z } from "zod";
import {
  nowSchema,
  statsSchema,
  projectsSchema,
  usesSchema,
  gallerySchema,
} from "./content/schemas";

const contentDir = resolve(process.cwd(), "content");

const files: { path: string; schema: z.ZodTypeAny }[] = [
  { path: "now.json", schema: nowSchema },
  { path: "stats.json", schema: statsSchema },
  { path: "projects.json", schema: projectsSchema },
  { path: "uses.json", schema: usesSchema },
  { path: "gallery.json", schema: gallerySchema },
];

let failed = false;

for (const { path: relPath, schema } of files) {
  const fullPath = resolve(contentDir, relPath);
  try {
    const raw = readFileSync(fullPath, "utf-8");
    const data = JSON.parse(raw);
    schema.parse(data);
    console.log(`✓ ${relPath}`);
  } catch (err) {
    failed = true;
    console.error(`✗ ${relPath}`);
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
}

process.exit(failed ? 1 : 0);
