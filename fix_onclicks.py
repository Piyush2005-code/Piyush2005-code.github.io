import glob
import re

files = glob.glob('src/components/*.jsx')

def fix_onclick(match):
    code = match.group(1)
    # Convert 'event' to 'e'
    code = code.replace('event.preventDefault()', 'e.preventDefault()')
    code = code.replace('event.stopPropagation()', 'e.stopPropagation()')
    code = code.replace('if(event.target===this)', 'if(e.target===e.currentTarget)')
    
    # Prefix function calls with window. where applicable
    funcs = ['openModal', 'closeModal', 'openTerminalWidget', 'closeTerminalWidget', 'maximizeTerminalWidget', 'toggleTerminalTiling', 'closeMobile']
    for f in funcs:
        # Avoid double prefixing
        if f'window.{f}' not in code:
            code = re.sub(r'\b' + f + r'\(', f'window.{f}(', code)
            
    return f'onClick={{(e) => {{ {code} }}}}'

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    new_content = re.sub(r'onClick="([^"]+)"', fix_onclick, content)
    
    if new_content != content:
        with open(f, 'w') as file:
            file.write(new_content)
        print(f"Fixed onClick in {f}")
