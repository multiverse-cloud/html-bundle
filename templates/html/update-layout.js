const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname);

// Common layout template
const commonLayoutStart = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{TITLE}} — mtverse</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            dark: {
              900: '#111827',
              800: '#1f2937',
              700: '#374151',
            }
          }
        }
      }
    }
  </script>
  <style>
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-800 font-sans dark:bg-gray-900 dark:text-gray-100">

<!-- Mobile overlay -->
<div id="sidebar-overlay" class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden" onclick="toggleSidebar()"></div>

<div class="flex h-screen overflow-hidden">
  <!-- Sidebar Container -->
  <div id="sidebar-container"></div>

  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Header Container -->
    <div id="header-container"></div>

    <!-- Page content -->
    <main class="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
`;

const commonLayoutEnd = `
    </main>
  </div>
</div>

<!-- Common Components -->
<script src="common-sidebar.js"></script>
<script src="common-header.js"></script>

</body>
</html>`;

// Get all HTML files
const files = fs.readdirSync(templatesDir)
  .filter(file => file.endsWith('.html') && !file.startsWith('common-') && file !== 'update-layout.js')
  .sort();

console.log(`Found ${files.length} HTML files to update`);

files.forEach((file, index) => {
  const filePath = path.join(templatesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title from existing content
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(' — mtverse', '') : file.replace('.html', '').replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Extract main content (between the old sidebar/header and closing tags)
  let mainContent = '';
  
  // Try to extract content from existing structure
  const mainStartMatch = content.match(/<main[^>]*>/);
  const mainEndMatch = content.match(/<\/main>/);
  
  if (mainStartMatch && mainEndMatch) {
    const startIndex = content.indexOf(mainStartMatch[0]) + mainStartMatch[0].length;
    const endIndex = content.indexOf(mainEndMatch[0]);
    mainContent = content.substring(startIndex, endIndex).trim();
  } else {
    // Fallback: extract content after header
    const headerEndMatch = content.match(/<\/header>/);
    if (headerEndMatch) {
      const startIndex = content.indexOf(headerEndMatch[0]) + headerEndMatch[0].length;
      const bodyEndMatch = content.match(/<\/body>/);
      const endIndex = bodyEndMatch ? content.indexOf(bodyEndMatch[0]) : content.length;
      mainContent = content.substring(startIndex, endIndex).trim();
    }
  }
  
  // Build new content
  const newContent = commonLayoutStart
    .replace('{{TITLE}}', title)
    .replace('{{FILENAME}}', file)
    + mainContent + '\n' + commonLayoutEnd;
  
  // Write new content
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log(`[${index + 1}/${files.length}] Updated: ${file}`);
});

console.log('\n✅ All files updated successfully!');
