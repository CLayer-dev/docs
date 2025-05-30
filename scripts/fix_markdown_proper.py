#!/usr/bin/env python3
import os
import re
import glob

def fix_markdown_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove trailing whitespace and orphaned closing backticks at the end
        content = content.rstrip()
        while content.endswith('```'):
            content = content[:-3].rstrip()
        
        # Now properly count and balance code blocks
        lines = content.split('\n')
        fixed_lines = []
        in_code_block = False
        
        for line in lines:
            if re.match(r'^```[a-zA-Z]*\s*$', line):
                # Opening code block
                if in_code_block:
                    # We're already in a code block, close the previous one first
                    fixed_lines.append('```')
                in_code_block = True
                fixed_lines.append(line)
            elif line.strip() == '```':
                # Closing code block
                if in_code_block:
                    in_code_block = False
                    fixed_lines.append(line)
                # If not in code block, ignore this orphaned closing backtick
            else:
                fixed_lines.append(line)
        
        # If we're still in a code block at the end, close it
        if in_code_block:
            fixed_lines.append('```')
        
        new_content = '\n'.join(fixed_lines)
        
        if new_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed {filepath}: balanced code blocks')
        else:
            print(f'OK: {filepath} - no changes needed')
        
    except Exception as e:
        print(f'Error processing {filepath}: {e}')

def main():
    # Find all markdown files in docs directory
    md_files = glob.glob('docs/**/*.md', recursive=True)
    
    for filepath in md_files:
        fix_markdown_file(filepath)

if __name__ == '__main__':
    main() 