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
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- POST /auth/login - User login (returns JWT)

```JSON
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- GET /articles - View all articles (public access)

Example request: `GET /articles`

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

## Swagger

Swagger is used for documentation of API-endpoints

- http://localhost:<PORT>/api-docs/
- example: http://localhost:3000/api-docs

## Test Credentials (local development only)

Use these for manual testing in Postman:

- Email: `ken@barbiegirl.com`
- Password: `ImjustKen`

# Motivation

I chose to build API endpoints using SQL because I previously completed a course on SQL queries, and this project allows me to build on that knowledge. This gives me a better understanding of the infrastructure behind a web application and how the backend and frontend interact. In this way I can learn how a back-end system actually works.

What I like about the process is that it is like a neat little puzzle where every piece has its place, and it is extremely satisfying to fit the pieces together.

The difficult part is that sometimes the puzzle breaks, and you have to hunt down the mistake that caused it. For this part I am very grateful for the AI tools that can find my typos when my tired eyes think everything looks the same.

Supabase would be ready to use instantly and would not require as much coding to set up. It is also cloud-based and accessible to everyone, meaning the infrastructure is managed by the platform. However, this would also mean being limited to the features provided by Supabase, whereas with Express I have full control and can implement any logic required.

What I think is the main benefit of a custom API is that you are in total control of what is there, and I find it fun to manage a database. However, if this were my job, my main concern would probably be security and the risk of putting everything on one server. In terms of maintenance, Supabase would require very little maintenance, while an Express server requires you to update and manage security yourself.

<!--
# Grading Criteria

- the GET /articles endpoint returns a list of articles
- the POST /articles endpoint is protected by auth and creates an article
- the POST /user/register endpoint registers a new user
- the POST /user/login endpoint logs a user in and returns a token
- the exported database SQL file contains the correct, working schema for the application
- the API code is sensibly arranged with ES modules and Express Router
- the endpoints contain validation and basic error handling
-->
