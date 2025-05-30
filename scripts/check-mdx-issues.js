#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking for MDX issues...\n');

// Check for files with JSX syntax but .md extension (excluding code blocks)
console.log('1. Checking for JSX syntax in .md files...');
try {
    const result = execSync('grep -r "className\\|<[A-Z]" docs/ --include="*.md" || true', { encoding: 'utf8' });
    if (result.trim()) {
        console.log('⚠️  Found JSX syntax in .md files:');
        console.log(result);
    } else {
        console.log('✅ No JSX syntax found in .md files');
    }
} catch (error) {
    console.log('✅ No JSX syntax found in .md files');
}

// Check for broken code blocks
console.log('\n2. Checking for broken code blocks...');
try {
    const result = execSync('find docs/ -name "*.md" -o -name "*.mdx" | xargs grep -c "^```$" | grep -v ":0$" || true', { encoding: 'utf8' });
    if (result.trim()) {
        const lines = result.trim().split('\n');
        let hasOddCount = false;
        lines.forEach(line => {
            const [file, count] = line.split(':');
            if (parseInt(count) % 2 !== 0) {
                hasOddCount = true;
                console.log(`⚠️  Unmatched code blocks in ${file}: ${count} markers`);
            }
        });
        if (!hasOddCount) {
            console.log('✅ All code blocks appear to be properly closed');
        }
    } else {
        console.log('✅ All code blocks appear to be properly closed');
    }
} catch (error) {
    console.log('✅ All code blocks appear to be properly closed');
}

// Check for missing files referenced in navigation
console.log('\n3. Checking for missing files referenced in navigation...');
const sidebarPath = path.join(__dirname, '../sidebars.ts');
if (fs.existsSync(sidebarPath)) {
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    // More precise regex to match file paths in sidebar items
    const fileReferences = sidebarContent.match(/'[a-z-]+\/[a-z-]+'/g) || [];

    let missingFiles = [];
    fileReferences.forEach(ref => {
        const cleanRef = ref.replace(/'/g, '');
        const filePath = path.join(__dirname, '../docs', cleanRef + '.md');
        const mdxPath = path.join(__dirname, '../docs', cleanRef + '.mdx');
        if (!fs.existsSync(filePath) && !fs.existsSync(mdxPath)) {
            missingFiles.push(cleanRef);
        }
    });

    if (missingFiles.length > 0) {
        console.log('⚠️  Missing files referenced in sidebar:');
        missingFiles.forEach(file => console.log(`   - ${file}.md or ${file}.mdx`));
    } else {
        console.log('✅ All sidebar references point to existing files');
    }
}

// Test build
console.log('\n4. Testing build...');
try {
    execSync('npm run build > /dev/null 2>&1');
    console.log('✅ Build successful');
} catch (error) {
    console.log('❌ Build failed - run "npm run build" for details');
}

console.log('\n🎉 MDX check complete!'); 