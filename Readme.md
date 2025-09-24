# Task Scheduling Application Backend

This is the backend server application code setup guide for the task scheduling application. Follow the steps below to set up and run the project locally.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/jitenderjoshimindfire/task-scheduling-app-server
cd <project-folder-name>
```

### 2. Install Dependencies and Dev Dependencies

```bash
npm install
```

### 3. Configure environment variables

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- REFRESH_TOKEN_SECRET=your_refresh_token_secret

### 4. Start the dev server

```bash
npm run dev
```

# Git Branching Rules

## Main Branch (`main` or `master`)

- Holds the **stable production-ready codebase**.
- Only thoroughly tested and approved changes are merged here.

## Develop Branch (`develop`)

- Serves as the **integration branch** where all feature branches are merged.
- Represents the latest development state before release.

## Feature Branches (`feature/<name>`)

- Created from `develop` for new features or enhancements.
- After completion and testing, merged back into `develop`.

## Bugfix Branches (`bugfix/<id>`)

- Used to fix issues found during development.
- Created from `develop` or `release` branch and merged back accordingly.

## Release Branches (`release/<version>`)

- Created from `develop` to prepare a new release.
- Final testing, bug fixes, and changelog updates are performed here before merging into both `main` and `develop`.

## Hotfix Branches (`hotfix/<id>`)

- Made from `main` to quickly fix **critical bugs in production**.
- After fixing, merged into both `main` and `develop`.

---

## Branch Naming Conventions

- Branch names are **clear and standardized** to indicate their purpose.
- Examples:
  - `feature/login`
  - `bugfix/1234`
  - `hotfix/security-patch`

---

## Pull Requests and Reviews

- All merges to `main` or `develop` occur via **pull requests**.
- Mandatory **code reviews** and **automated testing** are required before merging.

---

## Short-Lived Branches

- Feature, bugfix, and hotfix branches are kept **short-lived** to:
  - Reduce merge conflicts
  - Maintain code quality

---

## Protected Branches

- Branches such as `main` and `develop` are **protected from direct commits**.
- Require successful **CI checks** before merging.
