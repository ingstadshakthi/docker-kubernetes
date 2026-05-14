# Multi-Container Docker Application

A full-stack application demonstrating Docker multi-container setup with a Node.js backend API and React frontend, communicating with MongoDB database.

## Project Structure

```
05. multi container/
├── backend/
│   ├── Dockerfile
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── logs/
│   │   └── access.log
│   └── models/
│       └── goal.js
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── logo files
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── index.css
│       ├── components/
│       │   ├── goals/
│       │   │   ├── CourseGoals.js
│       │   │   ├── GoalInput.js
│       │   │   └── GoalItem.js
│       │   └── UI/
│       │       ├── Card.js
│       │       ├── ErrorAlert.js
│       │       └── LoadingSpinner.js
└── README.md
```

## Commands Executed & Explanations

### 1. **Navigate to Backend Directory**

```bash
cd backend
```

**Explanation:** Changes the working directory to the backend folder where the Node.js Express application is located.

### 2. **Run Backend Server Locally (Before Dockerization)**

```bash
node app.js
```

**Explanation:** Runs the Node.js backend application directly on the local machine to test the server before containerization. This starts the Express server on port 80 and connects to MongoDB.

### 3. **Build Docker Image for Backend**

```bash
docker build -t goals-node .
```

**Explanation:** Creates a Docker image named `goals-node` from the Dockerfile in the backend directory.

- `-t goals-node`: Tags the image with the name "goals-node"
- `.`: Builds from the Dockerfile in the current directory
- **Process:**
  - Uses node:20-alpine as base image (lightweight)
  - Sets working directory to /app
  - Copies package.json
  - Runs `npm install` to install dependencies
  - Copies entire application code
  - Exposes port 80
  - Sets command to run `node app.js`

### 4. **Run Docker Container (Initial Attempts - Failed)**

```bash
docker run --name goals-backend --rm goals-node
```

**Explanation:** Runs the container without port mapping or detached mode.

- `--name goals-backend`: Names the container "goals-backend"
- `--rm`: Automatically removes the container when it exits
- **Issue:** Container exits because there's no external network access and MongoDB connection fails

### 5. **Run Docker Container with Port Mapping**

```bash
docker run --name goals-backend --rm goals-node -p 80:80 -d
```

**Explanation:** Runs the container with port mapping but incorrect flag order.

- `-p 80:80`: Maps port 80 from container to port 80 on host
- `-d`: Runs in detached mode (background)
- **Issue:** Flags placed after image name might not work properly depending on Docker version

### 6. **Correct Docker Run with Proper Flag Order**

```bash
docker run --name goals-backend --rm -d goals-node -p 80:80
```

**Explanation:** Runs the container with corrected flag placement.

- Flags positioned before image name
- `-d`: Detached mode (container runs in background)
- `-p 80:80`: Port mapping
- **Result:** Backend container now runs and is accessible

### 7. **Run Backend Container with Network**

```bash
docker run --name goals-backend --rm -d --network goals-net -p 80:80 goals-node
```

**Explanation:** Runs backend container connected to a Docker network.

- `--network goals-net`: Connects container to the "goals-net" network for communication with other containers (MongoDB, Frontend)
- This enables containers to communicate using container names as DNS

### 8. **Start Frontend Development Server**

```bash
npm start
```

**Explanation:** Runs the React frontend development server.

- Starts the application on port 3000
- Enables hot-reload for development
- Allows frontend testing while backend runs in Docker

## Staged Changes

The following files have been added and staged for commit:

### Backend Files

- **Dockerfile**: Container configuration for Node.js backend
- **app.js**: Express server with MongoDB integration (101 lines)
- **package.json**: Backend dependencies (Express, Mongoose, Body-parser, Morgan)
- **package-lock.json**: Locked dependency versions
- **models/goal.js**: MongoDB Goal schema definition
- **logs/access.log**: HTTP request logs captured by Morgan

### Frontend Files

- **Dockerfile**: Container configuration for React frontend
- **package.json**: Frontend dependencies (React 18, React-DOM)
- **package-lock.json**: Locked frontend dependency versions
- **public/index.html**: HTML template
- **public/favicon.ico, manifest.json, robots.txt**: Web app configs
- **src/App.js**: Main React component with API calls
- **src/index.js**: React app entry point
- **src/index.css**: Global styles
- **src/components/goals/**: Goal management components
- **src/components/UI/**: Reusable UI components (Card, ErrorAlert, LoadingSpinner)

## Git Commit History

```
a1092a6 feat(docker): docker images and containers
```

**Latest commit message:** "feat(docker): docker images and containers" - Added Docker configuration for multi-container setup.

## Architecture

- **Backend**: Node.js + Express + MongoDB Mongoose ORM
- **Frontend**: React 18 with Hooks
- **Database**: MongoDB
- **Communication**: Frontend fetches data from backend via HTTP on port 80
- **Logging**: Morgan middleware logs all HTTP requests to file

## Key API Endpoints (Backend)

- `GET /goals` - Fetch all goals
- `POST /goals` - Create a new goal
- `DELETE /goals/:id` - Delete a goal by ID

## Frontend Features

- Display list of goals
- Add new goals via form input
- Delete goals by clicking on them
- Error handling and loading states
- Responsive UI with CSS animations

## Running the Application

1. **Build backend image:**

   ```bash
   cd backend
   docker build -t goals-node .
   ```

2. **Create Docker network:**

   ```bash
   docker network create goals-net
   ```

3. **Run backend container:**

   ```bash
   docker run --name goals-backend --rm -d --network goals-net -p 80:80 goals-node
   ```

4. **Run frontend (development):**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## Technology Stack

| Component           | Technology    | Version   |
| ------------------- | ------------- | --------- |
| Backend Runtime     | Node.js       | 20-alpine |
| Backend Framework   | Express       | ^4.17.1   |
| Database            | MongoDB       | 3.6.1     |
| ORM                 | Mongoose      | ^5.10.3   |
| Frontend Framework  | React         | ^18.1.0   |
| Frontend Build Tool | React-scripts | 5.0.1     |
| HTTP Client         | Fetch API     | Native    |
| Logging             | Morgan        | ^1.10.0   |

## Environment Variables Required

- `MONGODB_URI`: MongoDB connection string (default: mongodb://mongodb:27017/course-goals)
- `PORT`: Server port (default: 80)

## Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ORM
- body-parser: Request body parsing middleware
- morgan: HTTP request logging middleware

### Frontend

- react: UI library
- react-dom: DOM rendering
- react-scripts: Build tools

## Notes

- Backend listens on port 80
- Frontend runs on port 3000 in development
- MongoDB expected to run on port 27017
- All containers should be on the same Docker network for proper communication
- Logs are persisted in `backend/logs/access.log`
