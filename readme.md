# Description

Build a news platform where users can browse and submit news articles. Build a REST API with Express with no frontend required.

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
- POST /auth/login - User login (returns JWT)
- GET /articles - View all articles (public access)
- POST /articles - Submit new article (protected, requires JWT)

# Database Tables:

- users (id, email, password_hash, created_at)
- articles (id, title, body, category, submitted_by, created_at)

# Setup

Run these commands to get started:

# Environment variables

- Copy .env.example to .env and fill in any required values for local development.
- Do NOT commit your .env file. .env is included in .gitignore by default.

# motivation

I chose to build

what you liked about the development process and what you didn't enjoy.

what you found difficult.

what you think the benefits of developing a custom API are versus using a SaaS option like Supabase, or vice versa.

# Grading Criteria

- the GET /articles endpoint returns a list of articles
- the POST /articles endpoint is protected by auth and creates an article
- the POST/ user/register endpoint registers a new user
- the POST /user/login endpoint logs a user in and returns a token
- the exported database SQL file contains the correct, working schema for the application
- the API code is sensibly arranged with ES modules and Express Router
- the endpoints contain validation and basic error handling
