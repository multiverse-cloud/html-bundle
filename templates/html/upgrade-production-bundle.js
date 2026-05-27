const fs = require('fs');
const path = require('path');

const htmlDir = __dirname;
const rootDir = path.resolve(htmlDir, '..', '..');
const metadataPath = path.join(rootDir, 'metadata', 'templates.json');

const htmlFiles = fs.readdirSync(htmlDir)
  .filter((file) => /^\d+-.+\.html$/.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let injected = 0;
let normalized = 0;
let wrapped = 0;

function ensureContentFrame(content) {
  return content.replace(
    /<main class="([^"]*flex-1[^"]*overflow-y-auto[^"]*)" tabindex="-1">\s*([\s\S]*?)\s*<\/main>/g,
    (match, className, inner) => {
      if (inner.includes('class="mx-auto w-full max-w-screen-2xl')) return match;
      const nextClassName = className.includes('overflow-x-hidden')
        ? className
        : className.replace('overflow-y-auto', 'overflow-y-auto overflow-x-hidden');
      wrapped += 1;
      return `<main class="${nextClassName}" tabindex="-1">
      <div class="mx-auto w-full max-w-screen-2xl">
${inner.trim()}
      </div>
    </main>`;
    }
  );
}

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (!content.includes('<meta name="theme-color"')) {
    content = content.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta name="theme-color" content="#465fff" />'
    );
  }

  if (!content.includes('<meta name="description"')) {
    const title = (content.match(/<title>(.*?)<\/title>/) || [null, file])[1]
      .replace(/\s+[—-]\s+mtverse/i, '')
      .trim();
    content = content.replace(
      '<meta name="theme-color" content="#465fff" />',
      `<meta name="theme-color" content="#465fff" />\n  <meta name="description" content="Production-ready ${title} HTML dashboard template with responsive TailAdmin-style layout, dark mode, command palette, actions, loaders, and polished UI states." />`
    );
  }

  content = content.replace(/\n  <script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*\n  <script>\s*tailwind\.config = \{[\s\S]*?\n  <\/script>/, '');

  if (!content.includes('<link rel="stylesheet" href="tailwind-production.css">')) {
    content = content.replace(
      '<link rel="stylesheet" href="pro-styles.css">',
      '<link rel="stylesheet" href="tailwind-production.css">\n  <link rel="stylesheet" href="pro-styles.css">'
    );
  }

  if (!content.includes('<script src="app-shell.js"></script>')) {
    content = content.replace(
      '<script src="common-header.js"></script>',
      '<script src="common-header.js"></script>\n<script src="app-shell.js"></script>'
    );
    injected += 1;
  }

  // Inject site loader script for all pages
  if (!content.includes('<script src="common-loader.js"></script>')) {
    content = content.replace(
      '<script src="common-sidebar.js"></script>',
      '<script src="common-loader.js"></script>\n<script src="common-sidebar.js"></script>'
    );
    injected += 1;
  }

  content = content
    .replace(/<main class="flex-1 overflow-y-auto px-4 lg:px-6 py-6">/g, '<main class="flex-1 overflow-y-auto px-4 lg:px-6 py-6" tabindex="-1">')
    .replace(/<main class="flex-1 overflow-y-auto px-4 lg:px-6 py-6" tabindex="-1">/g, '<main class="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 2xl:px-10 py-6" tabindex="-1">')
    .replace(/<button class="([^"]*bg-blue-600[^"]*)">/g, '<button type="button" class="$1">')
    .replace(/<button onclick=/g, '<button type="button" onclick=');

  content = ensureContentFrame(content);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    normalized += 1;
  }
}

if (fs.existsSync(metadataPath)) {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  if (!metadata.some((item) => item.id === 'html-117')) {
    metadata.push({
      id: 'html-117',
      title: 'TailAdmin HTML Components',
      slug: 'tailadmin-html-components',
      framework: 'html',
      category: 'ui-elements',
      description: 'A production-ready TailAdmin HTML components gallery covering alerts, avatars, badges, buttons, charts, grid images, metrics, profile, tables, and video.',
      previewImagePath: '/previews/html/117-tailadmin-components.png',
      sourceZipPath: '/source-zips/html/117-tailadmin-components.zip',
      livePreviewPath: '/live-previews/html/117-tailadmin-components.html',
      tags: ['tailadmin', 'components', 'ui-elements', 'production-ready'],
      responsive: true,
      darkModeReady: true,
      difficulty: 'advanced',
      createdAt: '2026-05-26'
    });
  }
  for (const item of metadata) {
    item.darkModeReady = true;
    item.responsive = true;
    item.difficulty = item.difficulty === 'beginner' ? 'intermediate' : 'advanced';
    const tagSet = new Set([...(item.tags || []), 'production-ready', 'dark-mode', 'responsive', 'tailadmin']);
    item.tags = Array.from(tagSet);
  }
  fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8');
}

console.log(JSON.stringify({
  htmlFiles: htmlFiles.length,
  normalized,
  injected,
  wrapped,
  metadataUpdated: fs.existsSync(metadataPath),
}, null, 2));
