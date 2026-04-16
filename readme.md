<img width="898" height="591" alt="image" src="https://github.com/user-attachments/assets/3e93be87-92d7-4f51-a6fb-cd030f6d1d84" />

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

```json
{
  "title": "Ken strikes again",
  "body": "Barbieland is buzzing after Ken organized the first-ever Beach Leadership Summit.",
  "category": "Entertainment"
}
```

Note: Add `Authorization: Bearer <token>` to the request header.

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

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- A MySQL client like [MySQL Workbench](https://www.mysql.com/products/workbench/)

## 1. Clone the Repository

```bash
git clone https://github.com/annikaeld/development-platforms-ca.git
cd development-platforms-ca
```

## 2. Set Up the Database

1. Open MySQL Workbench (or your preferred MySQL client)
2. Create a new database:
   ```sql
   CREATE DATABASE pink_press;
   ```
3. Import the database dump:
   - Go to **Server → Data Import**
   - Select the `database/dump.sql` file from this repository
   - Click **Start Import**

## 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   Copy-Item .env.example .env
   ```
2. Open `.env` and fill in your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=pink_press
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

## 4. Install Dependencies

```bash
npm install
```

## 5. Run the Backend Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 6. Run the Frontend

Open `index.html` in a browser. For best results, use a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

The frontend will automatically connect to the backend at `http://localhost:3000`.

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

What I liked about the development process is that it feels like solving a puzzle where every piece has its place. It is very satisfying when the different parts of the system finally work together.

What I found most difficult was when something broke and I had to track down the exact mistake that caused the problem. Debugging can take time, especially when the issue is caused by a small typo or configuration error.

The part I enjoyed the least was spending long periods searching for small mistakes. However, tools such as AI assistants and error messages helped identify these issues more quickly.

Supabase would be ready to use instantly and would not require as much coding to set up. It is also cloud-based and accessible to everyone, meaning the infrastructure is managed by the platform. However, this would also mean being limited to the features provided by Supabase, whereas with Express I have full control and can implement any logic required.

What I think is the main benefit of a custom API is that you are in total control of what is implemented, and I find it fun to manage a database. However, if this were my job, my main concern would probably be security and the risk of putting everything on one server. In terms of maintenance, Supabase would require very little maintenance, while an Express server requires you to update and manage security yourself. Developing a custom API also provides a deeper understanding of how backend systems work, including authentication, database queries, and server logic.

## AI Assistance Disclosure

This project used **GitHub Copilot (GPT-5.3-Codex)** only in ASK mode as a tutoring assistant for:

- concept explanations (Express middleware, JWT, validation),
- debugging guidance,
- documentation support.

I reviewed, understood, and edited all implementation decisions and final code.

Detailed AI usage and citation log: **`AI-usage.md`**.
