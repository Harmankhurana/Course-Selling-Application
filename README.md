# Course Selling Application – Backend

This project is the backend of a Course Selling Application built using Node.js, Express, and MongoDB.

It provides authentication for both Users and Admins, course creation & management by admins, and course purchasing functionality for users using secure JWT-based authentication.

## 📌 Overview

This backend server:

- Connects to MongoDB using Mongoose
- Provides REST API endpoints for Users & Admins
- Uses JWT authentication (separate secrets for User & Admin)
- Hashes passwords securely using bcrypt
- Validates input using Zod
- Implements protected routes using custom middleware
- Follows modular routing structure
- Loads environment variables using dotenv

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod (Input Validation)
- bcrypt (Password Hashing)
- JSON Web Token (JWT)
- dotenv
- Nodemon (Development)

---

📂 Project Structure
```bash
    Course_Selling_Application/
    │
    ├── routes/
    │   ├── user.js
    │   ├── admin.js
    │   └── course.js
    │
    ├── middleware/
    │   ├── user.middleware.js
    │   └── admin.middleware.js
    │
    ├── database/
    │   └── db.js
    │
    ├── config.js
    ├── index.js
    ├── package.json
    └── .env
```

---

# 🚀 Future Improvements

- Proper async/await fixes in hashing & compare
- Strong password validation rules
- Refresh token system
- Role-based access expansion
- Centralized error handling middleware
- Production-level logging (Winston / Morgan)
- Payment gateway integration
- Pagination & filtering for courses
- Rate limiting for APIs

---

# 🎯 Project Goal

This project demonstrates:

- Backend architecture structuring
- Authentication & authorization system
- REST API design
- MongoDB relational modeling
- Clean modular code organization