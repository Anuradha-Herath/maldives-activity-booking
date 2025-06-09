/**
 * JSX Syntax Verification Script
 * 
 * This script checks for common JSX syntax errors in React components
 * by attempting to parse them using esbuild.
 * 
 * Run with: node ./scripts/verify-jsx.js
 */

import { glob } from 'glob';
import { build } from 'esbuild';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

console.log(chalk.blue('🔍 Starting JSX syntax verification...'));

// Find all JSX files
const jsxFiles = await glob('src/**/*.jsx');
console.log(chalk.gray(`Found ${jsxFiles.length} JSX files to check`));

let hasErrors = false;

// Check each file individually to provide better error messages
for (const file of jsxFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for common JSX issues manually
    // Look for mismatched tags
    const openingTags = [];
    const tagPattern = /<(\/?[a-zA-Z][a-zA-Z0-9]*)/g;
    let match;
    
    while ((match = tagPattern.exec(content)) !== null) {
      const tag = match[1];
      if (!tag.startsWith('/')) {
        openingTags.push(tag);
      } else {
        const closingTag = tag.substring(1);
        if (openingTags.length > 0 && openingTags[openingTags.length - 1] === closingTag) {
          openingTags.pop();
        } else {
          console.log(chalk.red(`Potential mismatched tag in ${file}: ${closingTag}`));
        }
      }
    }

    // Now try to actually build it with esbuild
    await build({
      entryPoints: [file],
      write: false,
      bundle: false,
      logLevel: 'silent',
      format: 'esm',
    });
    
    console.log(chalk.green(`✓ ${file} - No syntax errors`));
  } catch (error) {
    console.log(chalk.red(`✗ ${file} - Syntax error:`));
    console.log(chalk.yellow(error.message));
    hasErrors = true;
  }
}

if (hasErrors) {
  console.log(chalk.red('❌ JSX verification failed. Please fix the errors above before deploying.'));
  process.exit(1);
} else {
  console.log(chalk.green('✅ All JSX files passed syntax verification!'));
}
