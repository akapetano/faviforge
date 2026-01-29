import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import type { GeneratorConfig, IconConfig } from "./config.js";
import { DEFAULT_SIZES } from "./config.constants.js";

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

async function generateIconsFromSvg(
  svgPath: string,
  configs: IconConfig[],
  outputDir: string,
  density: number,
  label: string,
): Promise<void> {
  console.log(`\n${label}\n`);

  await ensureDir(outputDir);

  for (const { name, size } of configs) {
    try {
      const effectiveDensity =
        size <= 16
          ? density * 8 // 2400 DPI for 16x16
          : size <= 32
            ? density * 6 // 1800 DPI for 32x32
            : size <= 64
              ? density * 2 // 600 DPI for 64x64
              : density;

      await sharp(svgPath, { density: effectiveDensity })
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: size <= 64 ? sharp.kernel.lanczos3 : sharp.kernel.lanczos2,
        })
        .png()
        .toFile(join(outputDir, name));

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ Failed to generate ${name}:`, message);
    }
  }
}

async function generateFavicon(
  svgPath: string,
  outputPath: string,
  density: number,
): Promise<void> {
  console.log("\n🎯 Generating favicon.ico...\n");

  try {
    const png16 = await sharp(svgPath, { density: density * 8 })
      .resize(16, 16, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const png32 = await sharp(svgPath, { density: density * 6 })
      .resize(32, 32, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const icoBuffer = await pngToIco([png16, png32]);
    await writeFile(outputPath, icoBuffer);

    console.log("✓ Generated favicon.ico (16x16 + 32x32)");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("✗ Failed to generate favicon.ico:", message);
  }
}

export async function generateIcons(config: GeneratorConfig): Promise<void> {
  const {
    input,
    inputDark,
    outputDir,
    sizes = DEFAULT_SIZES,
    darkSizes,
    generateFavicon: shouldGenerateFavicon = true,
    faviconDir = outputDir,
    density = 300,
  } = config;

  console.log("🔥 faviforge - Generating icons from SVG...");

  // Generate light mode icons
  await generateIconsFromSvg(
    input,
    sizes,
    outputDir,
    density,
    "☀️  Light mode icons:",
  );

  // Generate dark mode icons if provided
  if (inputDark && darkSizes) {
    await generateIconsFromSvg(
      inputDark,
      darkSizes,
      outputDir,
      density,
      "🌙 Dark mode icons:",
    );
  }

  // Generate favicon.ico
  if (shouldGenerateFavicon) {
    await ensureDir(faviconDir);
    await generateFavicon(input, join(faviconDir, "favicon.ico"), density);
  }

  console.log("\n✨ All icons generated successfully!");
}
