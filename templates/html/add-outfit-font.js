const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname);
const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">`;

let updated = 0;
files.forEach(file => {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('Outfit')) {
    return;
  }

  // Insert before </head>
  const updated_content = content.replace('</head>', `  ${fontLink}\n</head>`);
  if (updated_content !== content) {
    fs.writeFileSync(filePath, updated_content, 'utf8');
    updated++;
  }
});

console.log(`Outfit font added to ${updated} files.`);
