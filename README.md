# Modern UI

A modern component and hooks library for React projects, inspired by shadcn/ui, that lets you easily add beautiful UI components and useful hooks to your projects.

## Requirements

- Next.js or Vite project
- Node.js 16.8+

## Quick Start

```bash
# Initialize Modern UI
npx @modern-pack/ui init

# Add components
npx @modern-pack/ui add button
npx @modern-pack/ui add card

# Add hooks
npx @modern-pack/ui add use-media-query
npx @modern-pack/ui add use-debounce
```

## Features

- ✅ Simple component and hook installation via CLI
- ✅ Next.js and Vite support with automatic detection
- ✅ Automatic Tailwind CSS setup
- ✅ Smart dependency management
- ✅ TypeScript support
- ✅ Component versioning
- ✅ Path aliases configuration
- ✅ Custom import paths for hooks and utilities

## Configuration

Upon initialization, a `modern-ui.json` file is created in your project:

```json
{
  "style": "default",
  "path": "src/components/modern-ui",
  "typescript": true,
  "tailwind": true,
  "tailwindVersion": "v4",
  "framework": "next",
  "theme": "default",
  "aliases": {
    "cn": "@/lib/utils",
    "hook": "@/hooks"
  },
  "components": []
}
```

### Configuration Options

- `style`: UI style (currently only "default")
- `path`: Component installation location
- `typescript`: TypeScript support toggle
- `tailwind`: Tailwind CSS support toggle
- `tailwindVersion`: Tailwind version (v3 or v4)
- `framework`: Detected framework (next or vite)
- `theme`: Theme selection for styling (options: "default", "blue")
- `aliases`: Custom import paths
  - `cn`: Import path for className utility
  - `hook`: Import path for hooks
- `components`: Tracks installed components and hooks

## Key Features

### 1. Component and Hook Installation

Modern UI allows you to install both UI components and custom hooks:

```bash
# Install components
npx @modern-pack/ui add button
npx @modern-pack/ui add card

# Install hooks
npx @modern-pack/ui add use-media-query
npx @modern-pack/ui add use-click-outside
```

Hooks are automatically installed to your configured hook directory (`aliases.hook` path).

### 2. Automatic Framework Detection

Modern UI detects your project framework and configures components accordingly.

### 3. Tailwind CSS Integration

If Tailwind CSS isn't detected during initialization, Modern UI will offer to install and configure it.

### 4. Theme Support

Modern UI comes with multiple theme options:
- Default theme - A clean, minimal design with subtle gradients 
- Blue theme - A vibrant blue-focused design with enhanced shadows

During initialization, you'll be asked to select a theme which will set up the appropriate Tailwind CSS configuration. This includes:
- Custom color schemes
- Consistent border radius
- Animation presets
- Shadow configurations

You can also manually update your theme by modifying the Tailwind configuration file directly.

### 5. Smart Import Path Management

- Components that use hooks will automatically import from your configured hook path
- The `cn` utility for className merging is automatically imported from your configured path
- All imports are standardized to follow your project's configured path structure

### 6. Smart Dependency Management

When adding components with external dependencies:
1. Modern UI checks if required packages are installed
2. Prompts for installation if needed
3. Installs with compatible versions

### 7. Version Management

```bash
# List installed components and hooks
npx @modern-pack/ui version

# Install specific versions
npx @modern-pack/ui add button --version 0.9.0

# Check available versions
npx @modern-pack/ui version --available button

# Update components
npx @modern-pack/ui version --update button
```

### 8. Path Aliases Support

Modern UI can automatically configure path aliases in your project:
- Sets up tsconfig.json paths for TypeScript projects
- Configures vite.config.js/ts for Vite projects
- Creates proper import aliases like "@/components" for easier imports

## License

ISC 