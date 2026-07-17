import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";
import { getPostBySlug, resolveRequestSlugToFileSlug } from "@/lib/blog";

export const alt = "Kaia Fay — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Display master path from public/images/logo-kf.svg (not the favicon optical variant).
const KF_PATH =
  "M68 158.949L208.5 0H437.368V60H242.376Q238.876 60 236.5445 62.6105L225 75.5361V147H428.868V207.5H284.868V351.5H216Q212.5 351.5 210.2629 348.8082L68 177.626V351.5H0V0H68V158.949ZM141.409 167.713L225 271.896V75.5361L141.409 167.713Z";

function loadFont(file: string) {
  return readFile(join(process.cwd(), "app/(main)/blog/[slug]", file));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fileSlug = resolveRequestSlugToFileSlug(slug);
  const title = fileSlug ? getPostBySlug(fileSlug).meta.title : "Blog";

  const [outfit, interRegular, interMedium] = await Promise.all([
    loadFont("og-outfit-semibold.ttf"),
    loadFont("og-inter-regular.ttf"),
    loadFont("og-inter-medium.ttf"),
  ]);

  // step the title size down as length grows so long titles stay on-card
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundImage: "linear-gradient(100deg, #1C1917 55%, #2A2420 100%)",
          position: "relative",
        }}
      >
        <svg
          width={640}
          height={514}
          viewBox="0 0 438 352"
          style={{ position: "absolute", right: -110, top: 58, opacity: 0.1 }}
        >
          <path fillRule="evenodd" clipRule="evenodd" d={KF_PATH} fill="#F5F0EB" />
        </svg>
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 3,
            color: "#8F3848",
          }}
        >
          KAIA FAY · BLOG
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Outfit",
            fontWeight: 600,
            fontSize: titleSize,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: "#F5F0EB",
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 28,
            color: "#9A8F85",
          }}
        >
          kaiafay.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: outfit, weight: 600, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
