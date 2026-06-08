---
name: Portfolio Website
description: Personal portfolio website for Piyush Singh Bhati - AI Systems Engineer
type: project
---

# Portfolio Website - Piyush Singh Bhati

## Overview
A modern, dark-themed portfolio website showcasing projects and expertise in AI Systems Engineering. The site features a sleek design with smooth animations, responsive layout, and a grid noise background effect.

## Directory Structure

```
portfolio/
├── index.html          # Main HTML file (contains all CSS and JS inline)
├── temp.js             # Additional JavaScript file (69KB)
├── src/                # Assets and media
│   ├── ascii_art.txt
│   ├── images/         # Various project images (CounselAI, Crop Detection, etc.)
│   └── audio/          # Audio files (separate directory)
├── videos/             # Video files directory
├── .github/            # GitHub related files
└── .git/               # Git repository
```

## Key Files

### index.html (209KB)
The main file containing:
- All HTML structure with semantic tags
- Inline CSS with custom CSS variables for dark theme
- JavaScript for interactivity and animations
- Responsive design with viewport meta tag
- Google Fonts integration (Outfit, JetBrains Mono, Rajdhani)
- Navigation bar with smooth scrolling
- Grid noise background effect
- Section-based layout (Hero, Projects, About, Contact, etc.)

### temp.js
Additional JavaScript functionality:
- Large file (69KB) containing complex scripts
- Likely contains project-specific interactions
- May include animations, form handling, or dynamic content

### src/
Contains all assets:
- Project images and screenshots
- ASCII art
- Audio files
- Various visual assets for portfolio projects

## Features

### Design System
- **Theme**: Dark mode with customizable color palette
- **Colors**: Custom CSS variables for consistent theming
- **Typography**: Google Fonts (Outfit, JetBrains Mono, Rajdhani)
- **Layout**: Responsive with clamp() for fluid typography

### Visual Effects
- Grid noise background pattern
- Smooth scrolling behavior
- Transitions on navigation
- Glow effects on interactive elements
- Backdrop filters and blur effects

### Navigation
- Fixed navigation bar
- Smooth scroll to sections
- Responsive padding with clamp()
- Hover states and transitions

## Development Notes

### CSS Architecture
- Uses CSS custom properties (variables) for theming
- Organized with comment sections for different components
- Mobile-first responsive design
- Uses modern CSS features (clamp, mask-image, linear gradients)

### JavaScript
- Likely uses vanilla JavaScript (no frameworks detected)
- Event listeners for scroll effects
- Smooth scroll implementation
- Potential intersection observers for animations

### Performance Considerations
- Large inline CSS/JS may impact initial load
- Preconnected fonts for faster loading
- Optimized with CSS masks and gradients
- Consider extracting CSS/JS to external files for production

### Browser Support
- Modern browsers with CSS Grid/Flexbox support
- Smooth scrolling behavior
- CSS custom properties support
- backdrop-filter for blur effects

## Project Sections (from HTML structure)

Based on typical portfolio structure, likely includes:
1. **Hero Section**: Introduction with name, title, and call-to-action
2. **About Section**: Personal background and expertise
3. **Projects Section**: Project showcases with images and descriptions
4. **Skills/Expertise**: Technical skills and tools
5. **Experience**: Work history and education
6. **Contact**: Contact information and form
7. **Blog/Articles**: Technical writing and insights

## Dependencies

### External
- Google Fonts (Outfit, JetBrains Mono, Rajdhani)
- No JavaScript frameworks detected
- No build tools or bundlers (static site)

### Internal
- Inline CSS and JavaScript
- Local assets in `/src/` directory
- Git repository for version control

## Setup and Running

### Prerequisites
- Modern web browser
- Local web server (optional, for local development)

### Running Locally
1. Clone the repository
2. Open `index.html` in a browser
3. No build process required

### Development
- Edit `index.html` directly
- Add new projects in `/src/images/`
- Update JavaScript in `temp.js` or inline sections
- Modify CSS variables in the `:root` section for theme changes

## Future Enhancements

### Performance
- Extract CSS to external file
- Minify and bundle JavaScript
- Implement lazy loading for images
- Add CDN for fonts

### Features
- Dark/light mode toggle
- Project filtering system
- Interactive 3D elements
- Blog section with markdown support
- Contact form integration
- Analytics tracking

### SEO
- Add meta tags for social sharing
- Implement structured data
- Add sitemap
- Optimize images and alt text

## Git Information
- **Branch**: dep
- **Recent commits**: Feature additions and updates
- **Repository**: Local Git repository with remote tracking

## Notes for Development
- The large inline CSS/JS suggests this is a single-file portfolio
- Consider modularizing for maintainability
- Grid background effect uses CSS mask-image
- Smooth scrolling implemented via CSS `scroll-behavior: smooth`
- Navigation uses fixed positioning with transitions