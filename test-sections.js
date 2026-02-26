const fs = require('fs');

// We have to parse or mock the file since it's TypeScript 
const { execSync } = require('child_process');

try {
  const content = fs.readFileSync('lib/blogData.ts', 'utf8');
  // Just write a quick regex to extract arrays
} catch(e) {}
