export interface IconConfig {
  name: string;
  size: number;
}

export interface GeneratorConfig {
  input: string; // Path to light mode SVG
  inputDark?: string; // Path to dark mode SVG (optional)
  outputDir: string; // Output directory
  sizes?: IconConfig[]; // Custom sizes (defaults to DEFAULT_SIZES)
  darkSizes?: IconConfig[]; // Dark mode sizes (optional)
  generateFavicon?: boolean; // Generate .ico (default: true)
  faviconDir?: string; // Where to put favicon.ico (default: outputDir)
  density?: number; // Render density (default: 300)
}
