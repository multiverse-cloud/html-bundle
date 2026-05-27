const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname);

const newStyles = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slideDown {
      animation: slideDown 0.2s ease-out;
    }
    .sidebar-text {
      transition: opacity 0.2s ease-in-out;
    }`;

const files = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(htmlDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if animation styles already exist
  if (content.includes('animate-slideDown')) {
    console.log(`Skipping ${file} - animations already exist`);
    return;
  }
  
  // Find the style tag and add new styles before closing </style>
  const updatedContent = content.replace(
    /(\.no-scrollbar \{[\s\S]*?scrollbar-width: none;\s*\})/,
    `$1${newStyles}`
  );
  
  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No style tag found in ${file}`);
  }
});

console.log('Animation styles added to all HTML files');
