#!/usr/bin/env python3
import os
import re
import glob

def fix_markdown_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count opening and closing backticks
        opening_blocks = len(re.findall(r'^```[a-zA-Z]*\s*$', content, re.MULTILINE))
        closing_blocks = len(re.findall(r'^```\s*$', content, re.MULTILINE))
        
        # If unbalanced, add closing backticks
        if opening_blocks > closing_blocks:
            missing = opening_blocks - closing_blocks
            # Remove any trailing whitespace and add proper closing
            content = content.rstrip() + '\n'
            for i in range(missing):
                content += '```\n'
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Fixed {filepath}: added {missing} closing backticks')
        elif opening_blocks < closing_blocks:
            print(f'Warning: {filepath} has more closing than opening backticks')
        else:
            print(f'OK: {filepath} - code blocks are balanced')
        
    except Exception as e:
        print(f'Error processing {filepath}: {e}')

def main():
    # Find all markdown files in docs directory
    md_files = glob.glob('docs/**/*.md', recursive=True)
    
    for filepath in md_files:
        fix_markdown_file(filepath)

if __name__ == '__main__':
    main() 