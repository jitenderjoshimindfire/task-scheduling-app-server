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