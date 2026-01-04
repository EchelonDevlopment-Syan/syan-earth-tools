# Contributing to SYAN.EARTH Tools

First off, thank you for considering contributing to SYAN.EARTH! 🌍🌊

We're building tools to protect coastlines and marine ecosystems through better HAB prediction. Every contribution helps us get closer to that goal.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

---

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

**Be respectful, inclusive, and constructive.**

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Please open an issue with:

1. **Clear title** describing the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **Environment details** (browser, OS, Node version)

### 💡 Suggesting Features

Have an idea? We'd love to hear it!

1. Check existing issues/discussions first
2. Open a new issue with the "Feature Request" template
3. Describe the use case and proposed solution
4. Be open to feedback and iteration

### 📊 Adding Data Sources

SYAN.EARTH thrives on quality data. To add a new source:

1. Document the source in `docs/DATA_SOURCES.md`
2. Include: name, URL, date range, parameters, update frequency
3. Add integration code if applicable
4. Submit PR with sample data validation

### 📝 Improving Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples and use cases
- Translate to other languages
- Create tutorials or guides

### 🔧 Code Contributions

Ready to code? Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write/update tests if applicable
5. Ensure linting passes (`npm run lint`)
6. Commit with clear messages
7. Push and open a Pull Request

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/syan-earth-tools.git
cd syan-earth-tools

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: For full API functionality
REACT_APP_ANTHROPIC_API_KEY=your_key_here
```

**Note:** Never commit API keys to the repository!

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No console.log statements left behind
- [ ] Tests pass (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (describe)

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### Review Process

1. Maintainers will review within 48-72 hours
2. Address any feedback or questions
3. Once approved, your PR will be merged
4. Celebrate! 🎉

---

## Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names
- Keep components focused and small
- Use JSDoc comments for complex functions

```javascript
// Good
const calculateUpwellingRisk = (sst, windDirection) => {
  // Implementation
};

// Avoid
const calc = (a, b) => {
  // What does this do?
};
```

### CSS/Styling

- Use inline styles or CSS-in-JS (consistent with existing code)
- Follow the existing color palette:
  - Primary cyan: `#00d4ff`
  - Secondary teal: `#00ffd4`
  - Background: `#0a1628` to `#16213e`
- Maintain dark theme consistency

### Commits

Use clear, descriptive commit messages:

```
feat: add upwelling index calculation
fix: correct temperature unit conversion
docs: update data source documentation
refactor: simplify correlation engine logic
```

---

## Community

### Getting Help

- 💬 [GitHub Discussions](https://github.com/syan-earth/syan-earth-tools/discussions) - Questions and ideas
- 🐛 [GitHub Issues](https://github.com/syan-earth/syan-earth-tools/issues) - Bug reports
- 📧 Email: dev@syan.earth

### Recognition

Contributors are recognized in:
- README.md acknowledgments
- Release notes
- Our website's contributors page

### Maintainers

- **Syan** - Founder/CEO, Echelon Development & Contract Consulting LLC

---

## Thank You! 🙏

Every contribution, no matter how small, helps protect our oceans and coastal communities. We're grateful for your support in building SYAN.EARTH.

**Together, we're making coastlines safer through climate intelligence.**

---

<p align="center">
  <a href="https://syan.earth">🌍 syan.earth</a>
</p>
