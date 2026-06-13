import re

with open("index.html", "r") as f:
    content = f.read()

# Replace src="src/ with src="public/
content = content.replace('src="src/', 'src="public/')

# Remove CSS
content = re.sub(r'\s*/\* ── MUSIC BUTTON ── \*/.*?#music-hint\s*{.*?}', '', content, flags=re.DOTALL)

# Remove HTML
content = re.sub(r'\s*<!-- BACKGROUND MUSIC -->\s*<audio id="bg-audio".*?</button>', '', content, flags=re.DOTALL)

# Remove Javascript
content = re.sub(r'\s*// ── MUSIC ──\s*const audio = document\.getElementById\('."'bg-audio'".'\);.*?window\.toggleMusic = \(\) => { btn\.click\(\); };', '', content, flags=re.DOTALL)

with open("index.html", "w") as f:
    f.write(content)

print("Fix applied successfully")
