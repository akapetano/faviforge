# 🔥 faviforge

Generate favicons and app icons from SVG files with ease.

[![npm version](https://badge.fury.io/js/faviforge.svg)](https://www.npmjs.com/package/faviforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Fast** - High-performance SVG to PNG conversion using Sharp
- 📱 **All sizes** - Generate 16x16 to 512x512 icons automatically
- 🌓 **Dark mode** - Support for dark mode icon variants
- 💎 **High quality** - 300 DPI rendering by default
- 🎯 **Next.js optimized** - Works perfectly with Next.js App Router
- 📦 **CLI & API** - Use as a CLI tool or programmatically
- 🔧 **Customizable** - Configure sizes, output paths, and density
- 🎨 **ICO generation** - Creates multi-size favicon.ico files

## Installation

```bash
# npm
npm install -D faviforge

# pnpm
pnpm add -D faviforge

# yarn
yarn add -D faviforge
```

## Quick Start

### CLI Usage

```bash
# Basic usage
npx faviforge -i icon.svg -o public/icons

# With dark mode variant
npx faviforge -i icon.svg --input-dark icon-dark.svg -o public/icons

# Custom density
npx faviforge -i icon.svg -o public/icons -d 600

# Skip favicon.ico generation
npx faviforge -i icon.svg -o public/icons --no-ico

# Put favicon.ico in a different location
npx faviforge -i icon.svg -o public/icons --favicon-dir public
```

### Programmatic Usage

```typescript
import { generateIcons, DEFAULT_SIZES, DARK_MODE_SIZES } from 'faviforge';

await generateIcons({
  input: 'src/app/icon.svg',
  inputDark: 'src/app/icon-dark.svg',
  outputDir: 'public/icons',
  sizes: DEFAULT_SIZES,
  darkSizes: DARK_MODE_SIZES,
  generateFavicon: true,
  faviconDir: 'public',
  density: 300,
});
```

### In package.json

```json
{
  "scripts": {
    "generate:icons": "faviforge -i src/app/icon.svg -o public/icons"
  }
}
```

## Generated Icons

By default, faviforge generates the following icons:

### Light Mode Icons
- `icon-16x16.png` (16×16)
- `icon-32x32.png` (32×32)
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png` (192×192)
- `android-chrome-512x512.png` (512×512)

### Dark Mode Icons (when `--input-dark` is provided)
- `apple-touch-icon-dark.png` (180×180)
- `android-chrome-192x192-dark.png` (192×192)
- `android-chrome-512x512-dark.png` (512×512)

### Additional
- `favicon.ico` (multi-size: 16×16 + 32×32)

## CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--input <path>` | `-i` | Input SVG file (required) | - |
| `--input-dark <path>` | - | Dark mode SVG (optional) | - |
| `--output <path>` | `-o` | Output directory | `public/icons` |
| `--density <number>` | `-d` | Render density | `300` |
| `--no-ico` | - | Skip favicon.ico generation | `false` |
| `--favicon-dir <path>` | - | Directory for favicon.ico | Same as output |

## API Reference

### `generateIcons(config: GeneratorConfig)`

Generate icons from SVG files.

#### Parameters

```typescript
interface GeneratorConfig {
  input: string;              // Path to light mode SVG
  inputDark?: string;          // Path to dark mode SVG (optional)
  outputDir: string;           // Output directory
  sizes?: IconConfig[];        // Custom sizes (defaults to DEFAULT_SIZES)
  darkSizes?: IconConfig[];    // Dark mode sizes (optional)
  generateFavicon?: boolean;   // Generate .ico (default: true)
  faviconDir?: string;         // Where to put favicon.ico (default: outputDir)
  density?: number;            // Render density (default: 300)
}

interface IconConfig {
  name: string;  // Output filename (e.g., "icon-32x32.png")
  size: number;  // Size in pixels (e.g., 32)
}
```

#### Exports

```typescript
export { generateIcons } from 'faviforge';
export { DEFAULT_SIZES, DARK_MODE_SIZES } from 'faviforge';
export type { GeneratorConfig, IconConfig } from 'faviforge';
```

## Examples

### Next.js 15+ App Router

1. Generate icons:
```bash
npx faviforge -i src/app/icon.svg --input-dark src/app/icon-dark.svg -o public/icons --favicon-dir public
```

2. Update your `layout.tsx`:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};
```

### Custom Sizes

```typescript
import { generateIcons } from 'faviforge';

await generateIcons({
  input: 'logo.svg',
  outputDir: 'dist/icons',
  sizes: [
    { name: 'favicon-16.png', size: 16 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-48.png', size: 48 },
    { name: 'logo-large.png', size: 1024 },
  ],
  density: 600, // Higher quality
});
```

### Multiple Icon Sets

```typescript
import { generateIcons } from 'faviforge';

// Generate light mode icons
await generateIcons({
  input: 'icon-light.svg',
  outputDir: 'public/icons',
});

// Generate dark mode icons separately
await generateIcons({
  input: 'icon-dark.svg',
  outputDir: 'public/icons',
  sizes: [
    { name: 'apple-touch-icon-dark.png', size: 180 },
    { name: 'android-chrome-192-dark.png', size: 192 },
  ],
  generateFavicon: false,
});
```

## Tips

### For Best Quality
- Use SVG files with viewBox dimensions that match your icon's aspect ratio
- Increase density for larger icons: `-d 600` for 512×512 and above
- Ensure your SVG has proper padding (10-20% around the main icon)

### For Next.js
- Keep `icon.svg` and `icon-dark.svg` in `src/app/` for automatic detection
- Generate PNGs to `public/icons/` to keep app directory clean
- Place `favicon.ico` in `public/` root for maximum compatibility

### For Performance
- Run icon generation as a build step, not at runtime
- Use the programmatic API if you need more control
- Cache generated icons in version control for faster deployments

## Troubleshooting

**Q: Icons look blurry**  
A: Increase the density: `-d 600` or higher. Sharp renders at the specified DPI before resizing.

**Q: TypeScript errors with png-to-ico**  
A: The package includes type declarations in `src/types/png-to-ico.d.ts`. Make sure your `tsconfig.json` includes the source directory.

**Q: Output directory doesn't exist**  
A: faviforge automatically creates the output directory if it doesn't exist.

**Q: Dark mode icons aren't working**  
A: Make sure you're using the `media="(prefers-color-scheme: dark)"` attribute in your HTML/metadata and that `--input-dark` was provided during generation.

## Requirements

- Node.js >= 18
- Sharp compatible platform (most Linux, macOS, Windows systems)

## License

MIT © Andrija Kapetanović

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related

- [Sharp](https://sharp.pixelplumbing.com/) - High performance Node.js image processing
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Next.js metadata API
- [Real Favicon Generator](https://realfavicongenerator.net/) - Online favicon generator

---

Made with 🔥 by Andrija Kapetanović
