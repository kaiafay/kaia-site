import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, "../public/images");

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(10)
    .jpeg({ quality: 20 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  const files = await readdir(imagesDir);
  const imageFiles = files.filter((f) =>
    /\.(jpg|jpeg|JPG|webp|png)$/i.test(f)
  );

  console.log("// Generated blurDataURL values - copy into Image components\n");
  for (const file of imageFiles.sort()) {
    const path = join(imagesDir, file);
    const blurDataURL = await generateBlurDataURL(path);
    const key = file.replace(/\.[^.]+$/, "");
    console.log(`${key}: \`${blurDataURL}\`,`);
  }
}

main().catch(console.error);
