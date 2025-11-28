const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/[lang]/page.tsx',
  'src/app/[lang]/about/page.tsx',
  'src/app/[lang]/services/page.tsx',
  'src/app/[lang]/products/page.tsx',
  'src/app/[lang]/solutions/page.tsx',
  'src/app/[lang]/contact/page.tsx',
  'src/app/[lang]/blog/page.tsx',
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/orange-/g, 'emerald-');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
  } else {
    console.log(`❌ Not found: ${file}`);
  }
});

console.log('\n🎨 Color theme update complete!');
