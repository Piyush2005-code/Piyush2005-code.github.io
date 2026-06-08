import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
body_content = body_match.group(1) if body_match else ""

def html_to_jsx(html_str):
    html_str = html_str.replace('class="', 'className="')
    html_str = html_str.replace('onclick="', 'onClick="')
    html_str = html_str.replace('style="display:none"', 'style={{ display: "none" }}')
    html_str = html_str.replace('style="display: none"', 'style={{ display: "none" }}')
    html_str = html_str.replace('style="display: none;"', 'style={{ display: "none" }}')
    def style_repl(match):
        style_val = match.group(1)
        props = [p.strip() for p in style_val.split(';') if p.strip()]
        react_style = []
        for p in props:
            if ':' in p:
                k, v = p.split(':', 1)
                k = k.strip()
                v = v.strip().replace("'", '"')
                k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
                react_style.append(f'{k}: "{v}"')
        return 'style={{ ' + ', '.join(react_style) + ' }}'
    html_str = re.sub(r'style="([^"]+)"', style_repl, html_str)
    
    html_str = re.sub(r'<(br|hr|img|input|source)([^>]*)>', 
                      lambda m: f'<{m.group(1)}{m.group(2)} />' if not m.group(2).endswith('/') else m.group(0), 
                      html_str)
    html_str = html_str.replace('stroke-width', 'strokeWidth')
    html_str = html_str.replace('stroke-linecap', 'strokeLinecap')
    html_str = html_str.replace('stroke-linejoin', 'strokeLinejoin')
    html_str = html_str.replace('playsinline', 'playsInline')
    html_str = html_str.replace('autocomplete', 'autoComplete')
    html_str = html_str.replace('for="', 'htmlFor="')
    html_str = html_str.replace('tabindex=', 'tabIndex=')
    # Fix HTML comments
    html_str = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', html_str)
    return html_str

sections = [
    ('Navbar', r'<!-- NAV -->(.*?)<!-- HERO -->'),
    ('Hero', r'<!-- HERO -->(.*?)<!-- ABOUT -->'),
    ('About', r'<!-- ABOUT -->(.*?)<!-- RESEARCH -->'),
    ('Research', r'<!-- RESEARCH -->(.*?)<!-- PROJECTS -->'),
    ('Projects', r'<!-- PROJECTS -->(.*?)<!-- SKILLS -->'),
    ('Skills', r'<!-- SKILLS -->(.*?)<!-- CONTACT -->'),
    ('Contact', r'<!-- CONTACT -->(.*?)<!-- FOOTER -->'),
]

os.makedirs('src/components', exist_ok=True)

components_to_write = []

for name, pattern in sections:
    match = re.search(pattern, body_content, re.DOTALL)
    if match:
        components_to_write.append((name, match.group(1).strip()))

footer_match = re.search(r'<footer>(.*?)</footer>', body_content, re.DOTALL)
if footer_match:
    components_to_write.append(('Footer', f'<footer>{footer_match.group(1)}</footer>'))

modal_match = re.search(r'<!-- PROJECT MODAL .*?-->(.*?)<!-- TERMINAL WIDGET OVERLAY -->', body_content, re.DOTALL)
if modal_match:
    components_to_write.append(('ProjectModal', modal_match.group(1).strip()))

term_match = re.search(r'<!-- TERMINAL WIDGET OVERLAY -->(.*?)$', body_content, re.DOTALL)
if term_match:
    components_to_write.append(('Terminal', term_match.group(1).strip()))

for name, html_part in components_to_write:
    jsx_content = html_to_jsx(html_part)
    # Fix unmatched tag in Research
    if name == 'Research':
        jsx_content = jsx_content.replace('      </div>\n    </div>\n  </section>', '      </div>\n      </div>\n    </div>\n  </section>')
    
    with open(f'src/components/{name}.jsx', 'w', encoding='utf-8') as f:
        f.write(f'''import React from 'react';

const {name} = () => {{
  return (
    <>
      {jsx_content}
    </>
  );
}};

export default {name};
''')
    print(f"Created {name}.jsx")

audio_match = re.search(r'<!-- BACKGROUND MUSIC -->(.*?)<!-- NAV -->', body_content, re.DOTALL)
if audio_match:
    audio_html = audio_match.group(1).strip()
    audio_part = audio_html.split('<button className="floating-term-launcher"')[0].strip() if '<button className="floating-term-launcher"' in audio_html else audio_html.split('<button class="floating-term-launcher"')[0].strip()
    term_launcher = '<button class="floating-term-launcher"' + audio_html.split('<button class="floating-term-launcher"')[1] if '<button class="floating-term-launcher"' in audio_html else ""
    
    with open('src/components/MusicPlayer.jsx', 'w', encoding='utf-8') as f:
        f.write(f'''import React from 'react';

const MusicPlayer = () => {{
  return (
    <>
      {html_to_jsx(audio_part)}
    </>
  );
}};

export default MusicPlayer;
''')
    print("Created MusicPlayer.jsx")
    if term_launcher:
        with open('src/components/FloatingTermLauncher.jsx', 'w', encoding='utf-8') as f:
            f.write(f'''import React from 'react';

const FloatingTermLauncher = () => {{
  return (
    <>
      {html_to_jsx(term_launcher)}
    </>
  );
}};

export default FloatingTermLauncher;
''')
        print("Created FloatingTermLauncher.jsx")

script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    js_content = script_match.group(1).strip()
    with open('src/scripts.js', 'w', encoding='utf-8') as f:
        f.write("export function initPortfolioScripts() {\n")
        f.write(js_content)
        f.write("\n}\n")
    print("Created scripts.js")

