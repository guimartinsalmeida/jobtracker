# 📌 Job Tracker

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io)

A modern full-stack application designed to streamline and organize your job application process. Keep track of all your job applications in one secure, centralized platform.

## ✨ Features

- 🔐 **Secure Authentication**
  - User registration and login
  - JWT-based authentication
  - Password encryption with Bcrypt

- 📝 **Comprehensive Job Tracking**
  - Job title and company details
  - Application platform tracking
  - CV and cover letter management
  - Application status monitoring
  - Detailed notes and feedback
  - Response time tracking

- 🔄 **Job Management**
  - Create, read, update, and delete job applications
  - User-specific job listings
  - Organized application history

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech))
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing
- **Data Structure**: UUID for unique identifiers
- **Configuration**: dotenv for environment management

## 📁 Project Structure

```
backend/
├── controllers/    # Business logic (auth, users, jobs)
├── models/        # Database queries for jobs
├── routes/        # Express route definitions
├── middlewares/   # Authentication logic (JWT)
├── config/        # Database connection setup
├── .env.example   # Environment variable template
└── index.js       # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL client (optional, for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/guimartinsalmeida/jobtracker.git
   cd jobtracker/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your credentials:
   - `DATABASE_URL`: Neon database connection string
   - `JWT_SECRET`: Your JWT secret key

4. **Start the server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

## 🧪 API Testing

You can test the API using Postman or Insomnia:

### Authentication Endpoints
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login

### Job Endpoints
- `POST /api/jobs` - Create job application
- `GET /api/jobs` - Get all jobs

> **Note**: Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_token>
> ```

## 🎯 Roadmap

- [ ] File upload functionality for CV and cover letters
- [ ] React frontend implementation
- [ ] Advanced job filtering and search
- [ ] Analytics dashboard for application insights
- [ ] Email notifications for status updates
- [ ] Export functionality for job applications



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ 
