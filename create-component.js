#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

// Get the component name from CLI args
const componentName = process.argv[2];

if (!componentName) {
  console.error(
    "❌ Please provide a component name: node create-component.js MyComponent",
  );
  process.exit(1);
}

// Required for resolving paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define target directory
const componentDir = resolve(
  __dirname,
  "packages",
  "ui",
  "src",
  "components",
  componentName,
);

if (existsSync(componentDir)) {
  console.error(`❌ Component "${componentName}" already exists.`);
  process.exit(1);
}

mkdirSync(componentDir, { recursive: true });

// Lowercase name for CSS class
const className = `${componentName.toLowerCase()}Section`;

// Generate ComponentName.tsx
const componentTsx = `import styles from './${componentName}.module.css';

interface ${componentName}Props {
  exampleProp: string;
}

export default function ${componentName}({ exampleProp }: ${componentName}Props) {
  return <section className={styles.${className}}>${componentName} works! This is the {exampleProp}.</section>;
}
`;

writeFileSync(join(componentDir, `${componentName}.tsx`), componentTsx);

// Generate ComponentName.module.css
const componentCss = `.${className} {
  /* Style your component */
}
`;

writeFileSync(join(componentDir, `${componentName}.module.css`), componentCss);

// Generate index.ts
const indexTs = `export { default } from './${componentName}';
`;

writeFileSync(join(componentDir, `index.ts`), indexTs);

console.log(
  `✅ Component "${componentName}" created at packages/ui/src/components/${componentName}`,
);
