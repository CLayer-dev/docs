#!/usr/bin/env python3
import os
import re
import glob

def fix_code_blocks_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        lines = content.split('\n')
        fixed_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            
            # Check for function declarations that should be in code blocks
            if re.search(r'^\s*function\s+\w+\s*\(', line) and not re.search(r'^\s*```', lines[i-1] if i > 0 else ''):
                # This is a function declaration not in a code block
                # Look backwards for the start of what should be a code block
                start_idx = i
                while start_idx > 0 and lines[start_idx-1].strip() != '' and not re.match(r'^\s*```', lines[start_idx-1]):
                    start_idx -= 1
                
                # Look forward for the end of what should be a code block
                end_idx = i
                while end_idx < len(lines) - 1 and lines[end_idx+1].strip() != '' and not lines[end_idx+1].startswith('#'):
                    end_idx += 1
                
                # Insert code block markers
                if start_idx < i:
                    fixed_lines = fixed_lines[:start_idx] + ['```solidity'] + lines[start_idx:end_idx+1] + ['```']
                    i = end_idx + 1
                else:
                    fixed_lines.append('```solidity')
                    fixed_lines.append(line)
                    # Look for the closing
                    j = i + 1
                    while j < len(lines) and lines[j].strip() != '' and not lines[j].startswith('#'):
                        fixed_lines.append(lines[j])
                        j += 1
                    fixed_lines.append('```')
                    i = j
            else:
                fixed_lines.append(line)
                i += 1
        
        # Clean up malformed code blocks
        cleaned_lines = []
        in_code_block = False
        
        for line in fixed_lines:
            # Check for opening code block
            if re.match(r'^```[a-zA-Z]*\s*$', line):
                if in_code_block:
                    # Close previous block first
                    cleaned_lines.append('```')
                in_code_block = True
                cleaned_lines.append(line)
            # Check for closing code block
            elif line.strip() == '```':
                if in_code_block:
                    in_code_block = False
                    cleaned_lines.append(line)
                # Ignore orphaned closing blocks
            else:
                cleaned_lines.append(line)
        
        # If still in code block at end, close it
        if in_code_block:
            cleaned_lines.append('```')
        
        new_content = '\n'.join(cleaned_lines)
        
        if new_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Fixed {filepath}: corrected code block formatting')
            return True
        else:
            print(f'OK: {filepath} - no changes needed')
            return False
        
    except Exception as e:
        print(f'Error processing {filepath}: {e}')
        return False

def main():
    # Find all markdown files in docs directory
    md_files = glob.glob('docs/**/*.md', recursive=True)
    
    fixed_count = 0
    for filepath in md_files:
        if fix_code_blocks_in_file(filepath):
            fixed_count += 1
    
    print(f'Fixed {fixed_count} files total')

if __name__ == '__main__':
    main() 