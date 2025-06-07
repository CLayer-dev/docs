const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Build-time script to generate documentation index from actual files
// This runs during the build process to create a static index from dynamic files

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_FILE = path.join(__dirname, '../src/data/docs-index.ts');

function getAllMarkdownFiles(dir) {
    const files = [];

    function scanDirectory(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                scanDirectory(fullPath);
            } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
                files.push(fullPath);
            }
        }
    }

    scanDirectory(dir);
    return files;
}

function parseDocumentationFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content: markdownContent } = matter(content);

        // Get relative path from docs directory
        const relativePath = path.relative(DOCS_DIR, filePath);
        const pathParts = relativePath.split(path.sep);
        const category = pathParts.length > 1 ? pathParts[0] : 'general';

        // Generate ID from file path
        const id = relativePath
            .replace(/\.(md|mdx)$/, '')
            .replace(/[/\\]/g, '-')
            .toLowerCase();

        // Clean content for AI processing
        const cleanContent = markdownContent
            // Remove import statements
            .replace(/^import\s+.*$/gm, '')
            // Remove JSX components but keep the content
            .replace(/<([^>]+)>/g, '')
            // Remove HTML comments
            .replace(/<!--[\s\S]*?-->/g, '')
            // Clean up code blocks for better readability
            .replace(/```[\s\S]*?```/g, (match) => {
                return match.replace(/```(\w+)?\n/, '\nCode example:\n').replace(/```$/, '\n');
            })
            // Clean up multiple newlines
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        // Extract title from frontmatter or content
        let title = frontmatter.title;
        if (!title) {
            const titleMatch = cleanContent.match(/^#\s+(.+)$/m);
            title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, path.extname(filePath));
        }

        return {
            id,
            title,
            content: cleanContent,
            frontmatter,
            filePath: relativePath.replace(/\\/g, '/'), // Use forward slashes for consistency
            category
        };
    } catch (error) {
        console.error(`Error parsing file ${filePath}:`, error);
        return null;
    }
}

function generateDocsIndex() {
    console.log('📚 Building documentation index...');

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Find all markdown files
    const markdownFiles = getAllMarkdownFiles(DOCS_DIR);
    console.log(`Found ${markdownFiles.length} documentation files`);

    // Parse all files
    const docsIndex = {};
    let processedCount = 0;

    for (const filePath of markdownFiles) {
        const docData = parseDocumentationFile(filePath);
        if (docData) {
            docsIndex[docData.id] = docData;
            processedCount++;
        }
    }

    console.log(`Successfully processed ${processedCount} files`);

    // Generate TypeScript file
    const timestamp = new Date().toISOString();
    const tsContent = `// Auto-generated documentation index
// Generated at: ${timestamp}
// Source: Circle Layer documentation files

import { DocumentationIndex } from '../types/docs';

export const DOCS_INDEX: DocumentationIndex = ${JSON.stringify(docsIndex, null, 2)} as const;

export const DOCS_METADATA = {
  generatedAt: '${timestamp}',
  totalDocs: ${processedCount},
  categories: ${JSON.stringify([...new Set(Object.values(docsIndex).map(doc => doc.category))])}
} as const;
`;

    // Write the file
    fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');
    console.log(`✅ Documentation index generated: ${OUTPUT_FILE}`);
    console.log(`📊 Total documents: ${processedCount}`);
    console.log(`📁 Categories: ${[...new Set(Object.values(docsIndex).map(doc => doc.category))].join(', ')}`);
}

// Run the script
if (require.main === module) {
    try {
        generateDocsIndex();
    } catch (error) {
        console.error('Failed to generate documentation index:', error);
        process.exit(1);
    }
}

module.exports = { generateDocsIndex }; 