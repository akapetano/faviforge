#!/usr/bin/env node
import { Command } from "commander";
import { generateIcons } from "./generator.js";
import { DEFAULT_SIZES, DARK_MODE_SIZES } from "./config.constants.js";

const program = new Command();

program
  .name("faviforge")
  .description("🔥 Generate favicons and app icons from SVG files")
  .version("0.1.0")
  .requiredOption("-i, --input <path>", "Input SVG file (light mode)")
  .option("--input-dark <path>", "Input SVG file for dark mode (optional)")
  .option("-o, --output <path>", "Output directory", "public/icons")
  .option("-d, --density <number>", "Render density", "300")
  .option("--no-ico", "Skip favicon.ico generation")
  .option(
    "--favicon-dir <path>",
    "Directory for favicon.ico (defaults to output dir)",
  )
  .action(async (options) => {
    await generateIcons({
      input: options.input,
      inputDark: options.inputDark,
      outputDir: options.output,
      sizes: DEFAULT_SIZES,
      ...(options.inputDark && { darkSizes: DARK_MODE_SIZES }),
      generateFavicon: options.ico,
      faviconDir: options.faviconDir,
      density: parseInt(options.density),
    });
  });

program.parse();
