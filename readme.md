# Description

Build a news platform where users can browse and submit news articles. Built as a REST API with Express with no frontend required.

## Public Access:

- Anyone can view the list of news articles
- Articles display title, body, category, and submission date

## User Authentication:

- User registration with email and password
- User login

## Article Management:

- Only authenticated users can submit news articles
- Article details: title, body, category (submission date can be automatic)
- Articles automatically tagged with submitter (logged-in user) information

# Tech Stack & Tools

- Express.js with TypeScript

- MySQL database with mysql2

- JWT authentication with bcrypt password hashing

- Basic validation
- Simple error handling

# Key Implementation Requirements:

- Use Express Router to organise endpoints
- Implement JWT authentication middleware
- The create article route must be protected by authentication
- Include proper error handling and status codes
- Use parameterised queries for SQL injection prevention

# Required Endpoints:

- POST /auth/register - User registration

```JSON
// POST /auth/register
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- POST /auth/login - User login (returns JWT)
- GET /articles - View all articles (public access)
- POST /articles - Submit new article (protected, requires JWT)

# Database Tables:

```SQL
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```SQL
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  category VARCHAR(100),
  submitted_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (submitted_by) REFERENCES users(id)
);
```

# Setup

1. Copy `.env.example` to `.env` and fill in your values:

```bash
Copy-Item .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
npm run dev
```

## Scripts

- **`npm run dev`**: Starts the server in development mode with auto-reloading
- **`npm run build`**: Compiles TypeScript code to JavaScript
- **`npm start`**: Runs the compiled JavaScript code (for production)

# motivation

I chose to build

what you liked about the development process and what you didn't enjoy.

what you found difficult.

what you think the benefits of developing a custom API are versus using a SaaS option like Supabase, or vice versa.

# Grading Criteria

- the GET /articles endpoint returns a list of articles
- the POST /articles endpoint is protected by auth and creates an article
- the POST /user/register endpoint registers a new user
- the POST /user/login endpoint logs a user in and returns a token
- the exported database SQL file contains the correct, working schema for the application
- the API code is sensibly arranged with ES modules and Express Router
- the endpoints contain validation and basic error handling
