const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname);

const files = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(htmlDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if pro-styles.css is already included
  if (content.includes('pro-styles.css')) {
    console.log(`Skipping ${file} - pro-styles.css already exists`);
    return;
  }
  
  // Add pro-styles.css link after the existing style tag
  const updatedContent = content.replace(
    /(<\/style>)/,
    `$1\n  <link rel="stylesheet" href="pro-styles.css">`
  );
  
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No style tag found in ${file}`);
  }
});

console.log('Pro styles added to all HTML files');
