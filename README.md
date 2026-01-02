# Task Management Application

A full-stack task management application built with React (frontend) and Node.js/Express (backend), using PostgreSQL as the database.

## Features

- ✅ User authentication (Register/Login)
- ✅ Create, read, update, and delete tasks
- ✅ User-specific task management
- ✅ RESTful API architecture
- ✅ Secure password hashing with bcrypt
- ✅ JWT-based authentication

## Tech Stack

### Frontend
- React.js
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Project Structure

```
task-management-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── routes/
│   │   ├── tasks.js         # Task routes
│   │   └── auth.js          # Authentication routes
│   ├── db.js                # Database configuration
│   ├── server.js            # Express server setup
│   ├── .env                 # Environment variables (DO NOT COMMIT)
│   ├── .env.example         # Environment variables template
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── src/                 # React source files
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
└── DatabaseConfigFile.sql   # Database schema
```

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/BreyeFoka/task-management-app.git
cd task-management-app
```

### 2. Set up the database
```bash
# Login to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE task_management;

# Run the SQL schema
\c task_management
\i DatabaseConfigFile.sql
```

### 3. Configure environment variables
```bash
cd backend
cp .env.example .env
```

Edit `.env` file with your database credentials:
```
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=task_management
DB_PASS=your_database_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 4. Install backend dependencies
```bash
cd backend
npm install
```

### 5. Install frontend dependencies
```bash
cd ../frontend
npm install
```

## Running the Application

### Start the backend server
```bash
cd backend
npm start
```
The server will run on `http://localhost:5000`

### Start the frontend development server
```bash
cd frontend
npm start
```
The React app will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Request Headers for Protected Routes
```
x-auth-token: <your-jwt-token>
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit your `.env` file to version control
- Change the `JWT_SECRET` to a strong, random string in production
- Use HTTPS in production environments
- Implement rate limiting for authentication endpoints

## Known Issues & TODO

### Critical Issues to Fix:
1. **Missing Authentication Middleware** - The file `backend/middleware/auth.js` is referenced but doesn't exist
2. **Missing Authentication Routes** - The file `backend/routes/auth.js` needs to be created
3. **Package.json typo** - Script name "strat" should be "start"
4. **Security Issue** - The `.env` file with credentials is committed to the repository

### Recommended Next Steps:
- [ ] Create `backend/middleware/auth.js`
- [ ] Create `backend/routes/auth.js` with register/login endpoints
- [ ] Update `backend/server.js` to include auth routes
- [ ] Remove `.env` from repository and add to `.gitignore`
- [ ] Create `.env.example` template
- [ ] Fix package.json script typo
- [ ] Add input validation
- [ ] Implement error handling middleware
- [ ] Add API documentation (Swagger/OpenAPI)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

BreyeFoka

## Acknowledgments

- Express.js documentation
- React.js documentation
- PostgreSQL documentation
