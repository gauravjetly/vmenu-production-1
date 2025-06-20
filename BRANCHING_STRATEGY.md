# VMenu Git Branching Strategy

## Overview
This document outlines the Git branching strategy for the VMenu project to ensure smooth development and stable production deployments.

## Branch Structure

### 1. **main** (Production)
- **Purpose**: Stable production code
- **URL**: https://vintiqmenus.com
- **Protection**: 
  - Requires pull request reviews
  - No direct pushes allowed
  - All tests must pass
  - Automatic deployment to production

### 2. **development** (Development)
- **Purpose**: Integration branch for new features
- **URL**: https://dev.vintiqmenus.com (when configured)
- **Protection**: 
  - Requires pull request reviews for external contributors
  - Core team can push directly
  - Automatic deployment to development environment

### 3. **feature/** branches
- **Purpose**: Individual feature development
- **Naming**: `feature/feature-name` (e.g., `feature/add-qr-code-generation`)
- **Lifecycle**: Created from `development`, merged back to `development`

### 4. **hotfix/** branches
- **Purpose**: Critical production fixes
- **Naming**: `hotfix/issue-description` (e.g., `hotfix/fix-login-error`)
- **Lifecycle**: Created from `main`, merged to both `main` and `development`

## Workflow

### Feature Development
```bash
# 1. Create feature branch from development
git checkout development
git pull origin development
git checkout -b feature/new-feature

# 2. Work on feature
git add .
git commit -m "feat: add new feature"

# 3. Push and create PR
git push origin feature/new-feature
# Create PR to development branch on GitHub
```

### Releasing to Production
```bash
# 1. Ensure development is stable
git checkout development
git pull origin development

# 2. Create PR from development to main
# This triggers review process

# 3. After approval and merge, production is automatically deployed
```

### Hotfix Process
```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Fix the issue
git add .
git commit -m "fix: resolve critical issue"

# 3. Push and create PRs
git push origin hotfix/critical-fix
# Create PR to main (for immediate deployment)
# Create PR to development (to include fix in dev)
```

## Commit Message Convention

Follow conventional commits for clear history:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Build process or auxiliary tool changes

Examples:
```bash
git commit -m "feat: add menu template functionality"
git commit -m "fix: resolve WebSocket connection timeout"
git commit -m "docs: update API documentation"
```

## CI/CD Integration

### Production (main branch)
- **Trigger**: Push to main or manual workflow dispatch
- **Actions**: 
  - Build all services
  - Run tests
  - Deploy to production AWS environment
  - Update https://vintiqmenus.com

### Development (development branch)
- **Trigger**: Push to development
- **Actions**:
  - Build all services
  - Run tests
  - Deploy to development AWS environment
  - Update https://dev.vintiqmenus.com

## Best Practices

1. **Never commit directly to main**
   - All changes must go through PR review
   - Exception: Critical hotfixes with team approval

2. **Keep branches up to date**
   ```bash
   git checkout development
   git pull origin development
   git checkout feature/my-feature
   git rebase development
   ```

3. **Test before creating PR**
   - Run local tests: `npm test`
   - Check linting: `npm run lint`
   - Test build: `npm run build`

4. **Clean up old branches**
   - Delete feature branches after merge
   - Keep release branches for reference

5. **Write meaningful PR descriptions**
   - What changes were made
   - Why they were necessary
   - How to test the changes
   - Screenshots for UI changes

## Setting Up Branch Protection (GitHub)

1. Go to Settings → Branches
2. Add rule for `main`:
   - Require pull request reviews (1-2 reviewers)
   - Dismiss stale PR approvals
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators
   - Restrict who can push

3. Add rule for `development`:
   - Require status checks to pass
   - Optionally require PR reviews

## Emergency Procedures

### Production Down
1. Create hotfix branch immediately
2. Fix issue with minimal changes
3. Test locally
4. Create PR with "URGENT" label
5. Get emergency approval (1 reviewer minimum)
6. Merge and monitor deployment

### Rollback Process
```bash
# Find last working commit
git log --oneline -10

# Revert to working state
git checkout main
git revert HEAD
git push origin main
```

## Questions?
Contact the team lead or check the project documentation for more details.