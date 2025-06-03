import { zodToTs, createTypeAlias, printNode } from 'zod-to-ts';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';

import { schemas } from '../schemas/choice.schema';

let output = `// This file is auto-generated from Zod schemas\n\n`;

for (const [name, schema] of Object.entries(schemas)) {
    const { node } = zodToTs(schema, name);
    output += `${printNode(createTypeAlias(node, name))}\n\n`;
}

// Use __dirname to resolve the absolute path
const outPath = resolve(__dirname, '../../ui/types/generated.d.ts');
const dir = dirname(outPath);

if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
}
writeFileSync(outPath, output);
console.log('✅ generated.d.ts written!');