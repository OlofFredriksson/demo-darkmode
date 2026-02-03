# Demo Darkmode

A demonstration web application showcasing dark mode implementation with automatic theme switching.

## Project Structure

```
src/
├── index.html              # Main HTML entry point
└── styles/
    ├── variables.scss      # CSS custom properties and theme variables
    ├── portal.scss         # Portal/base styles
    ├── header.scss         # Header component styles
    ├── footer.scss         # Footer component styles
    ├── application.scss    # Application-specific styles
    └── style.scss          # Main stylesheet

dist/                       # Compiled CSS output
```

### Installation

```bash
npm install
```

### Development

Start the development server with automatic SASS compilation:

```bash
npm start
```

### Building

Compile SASS files to CSS:

```bash
npm run build
```

## Theme Switching

The application provides three theme options via a dropdown selector:

- **Auto**: Respects system preference (prefers-color-scheme)
- **Dark**: Forces dark mode
- **Light**: Forces light mode
