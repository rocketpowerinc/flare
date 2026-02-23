# Contributing to Flare

We welcome contributions! Here's how to help.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/flare.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install`
5. Make your changes
6. Test: `make dev`
7. Commit: `git commit -m 'Add feature: description'`
8. Push: `git push origin feature/your-feature`
9. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
make dev

# Build for distribution
make build

# Install system-wide
sudo make install

# Run tests (if any)
npm test
```

## Code Guidelines

- Keep code simple and readable
- Add comments for complex logic
- Follow existing code style
- Test your changes before submitting PR

## Types of Contributions

### Bug Reports

- Use GitHub Issues
- Include: OS, Node version, Flare version, steps to reproduce
- Include error output/logs

### Feature Requests

- Use GitHub Issues with `[FEATURE]` prefix
- Describe the use case
- Explain expected behavior

### Documentation

- Edit files in `docs/` directory
- Keep instructions clear and up-to-date
- Include examples where helpful

### Code Improvements

- Improve performance
- Refactor legacy code
- Add error handling
- Enhance UI/UX

## Project Structure Reference

```
src/              - Main application code
├── main.js       - Electron main process
├── AppLauncher.js - App launching logic
├── ui/           - User interface files
└── services/     - Service modules

assets/           - App categories, configs, wallpapers
config/           - Configuration files
docs/             - Documentation
bin/              - Entry point script
Makefile          - Build automation
```

## Commit Messages

Use clear, descriptive commit messages:

```
Fix: Correct sidebar positioning bug
Feature: Add keyboard shortcuts
Docs: Update installation guide
Refactor: Simplify app loading logic
```

## Pull Request Process

1. Update INSTALL.md if dependencies change
2. Update README.md if usage changes
3. Add meaningful commit messages
4. Describe your changes in the PR
5. Link related issues with `Fixes #123`

## Questions?

- Create a GitHub Discussion
- Open an issue with your question
- Contact maintainers

Thank you for contributing! 🎉
