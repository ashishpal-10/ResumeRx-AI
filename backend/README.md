# 🤖 AI Resume Roast - Backend

A powerful AI-powered resume analysis backend built with **Node.js, Express.js, MongoDB, and Gemini AI**.

Users can register, log in, upload their resumes in **PDF or DOCX format**, and receive an AI-generated analysis including an **ATS score, strengths, weaknesses, missing skills, improvement suggestions, and a fun resume roast**.

---

## 🚀 Features

* 🔐 User Authentication
* 📝 User Registration and Login
* 🔑 JWT-based Authentication
* 🛡️ Protected API Routes
* 📄 Resume Upload
* 📑 Support for PDF and DOCX files
* 🔍 Resume Text Extraction
* 🤖 AI-powered Resume Analysis using Gemini AI
* 📊 ATS Score Generation
* 💪 Resume Strength Analysis
* ⚠️ Resume Weakness Detection
* 🧠 Missing Skills Detection
* 💡 Resume Improvement Suggestions
* 🔥 AI Resume Roast
* 📁 Resume Report History
* 🔒 User-specific Resume Reports
* 🗑️ Delete Resume Reports

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### File Upload

* Multer

### Resume Parsing

* pdf-parse
* Mammoth

### AI

* Google Gemini AI

### Other Tools

* dotenv
* cors
* nodemon

---

# 📁 Project Structure

```text
AI-Resume-Roast-Backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   └── reportController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   └── Report.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── reportRoutes.js
│   │
│   ├── services/
│   │   ├── parserService.js
│   │   └── aiService.js
│   │
│   └── server.js
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

## 2. Move into the Project

```bash
cd AI-Resume-Roast-Backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create a `.env` File

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# ▶️ Run the Project

For development:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

---

# 🔐 Authentication API

## Register User

### Endpoint

```text
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Ashish",
  "email": "ashish@example.com",
  "password": "1234567890"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "Ashish",
    "email": "ashish@example.com"
  }
}
```

---

## Login User

### Endpoint

```text
POST /api/auth/login
```

### Request Body

```json
{
  "email": "ashish@example.com",
  "password": "12345678"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Ashish",
    "email": "ashish@example.com"
  }
}
```

---

# 🔑 Protected Routes

Protected routes require a JWT token.

Add the following header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📄 Resume API

## Upload Resume

### Endpoint

```text
POST /api/resume/upload
```

### Authentication

Required 🔒

### Request Type

```text
multipart/form-data
```

### Form Data

| Key    | Type | Description        |
| ------ | ---- | ------------------ |
| resume | File | PDF or DOCX resume |

### Success Response

```json
{
  "success": true,
  "message": "Resume uploaded and processed successfully",
  "resume": {
    "id": "RESUME_ID",
    "originalName": "resume.pdf",
    "extractedText": "Extracted resume content..."
  }
}
```

---

# 🤖 AI Analysis API

## Analyze Resume

### Endpoint

```text
POST /api/reports/analyze/:resumeId
```

### Example

```text
POST /api/reports/analyze/RESUME_ID
```

### Authentication

Required 🔒

### AI Analysis Includes

* ATS Score
* Resume Summary
* Strengths
* Weaknesses
* Missing Skills
* Improvement Suggestions
* Resume Roast 🔥

### Success Response

```json
{
  "success": true,
  "message": "Resume analyzed successfully",
  "report": {
    "_id": "REPORT_ID",
    "user": "USER_ID",
    "resume": "RESUME_ID",
    "atsScore": 85,
    "summary": "The resume demonstrates strong technical skills.",
    "strengths": [
      "Strong React knowledge",
      "Good project experience"
    ],
    "weaknesses": [
      "Limited measurable achievements"
    ],
    "missingSkills": [
      "Docker",
      "AWS"
    ],
    "suggestions": [
      "Add measurable achievements",
      "Improve project descriptions"
    ],
    "resumeRoast": "Your resume has potential, but your bullet points are hiding it like they're in witness protection."
  }
}
```

---

# 📊 Report API

## Get All Reports

### Endpoint

```text
GET /api/reports
```

### Authentication

Required 🔒

This endpoint returns all reports belonging to the currently logged-in user.

---

## Get Single Report

### Endpoint

```text
GET /api/reports/:id
```

### Authentication

Required 🔒

### Example

```text
GET /api/reports/REPORT_ID
```

---

## Delete Report

### Endpoint

```text
DELETE /api/reports/:id
```

### Authentication

Required 🔒

### Example

```text
DELETE /api/reports/REPORT_ID
```

---

# 🔄 Application Workflow

```text
User
  ↓
Register / Login
  ↓
JWT Token
  ↓
Upload Resume
  ↓
Multer
  ↓
PDF / DOCX Parser
  ↓
Extract Resume Text
  ↓
MongoDB
  ↓
Gemini AI
  ↓
ATS Score + Analysis + Resume Roast
  ↓
Save Report
  ↓
View / Delete Reports
```

---

# 🗄️ Database Models

## User

```text
User
│
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

---

## Resume

```text
Resume
│
├── user
├── originalName
├── filePath
├── fileType
├── extractedText
├── createdAt
└── updatedAt
```

---

## Report

```text
Report
│
├── user
├── resume
├── atsScore
├── summary
├── strengths
├── weaknesses
├── missingSkills
├── suggestions
├── resumeRoast
├── createdAt
└── updatedAt
```

---

# 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* User-specific reports
* User-specific resume access
* Environment variables for sensitive information
* File type validation
* File size restrictions

---

# 📝 API Summary

| Method | Endpoint                         | Description       | Protected |
| ------ | -------------------------------- | ----------------- | --------- |
| POST   | `/api/auth/register`             | Register user     | ❌         |
| POST   | `/api/auth/login`                | Login user        | ❌         |
| POST   | `/api/resume/upload`             | Upload resume     | 🔒        |
| POST   | `/api/reports/analyze/:resumeId` | Analyze resume    | 🔒        |
| GET    | `/api/reports`                   | Get all reports   | 🔒        |
| GET    | `/api/reports/:id`               | Get single report | 🔒        |
| DELETE | `/api/reports/:id`               | Delete report     | 🔒        |

---

# 🔮 Future Improvements

* [ ] Resume download functionality
* [ ] PDF report generation
* [ ] Resume score breakdown
* [ ] Job description matching
* [ ] Cover letter generation
* [ ] LinkedIn profile analysis
* [ ] AI interview preparation
* [ ] Resume improvement suggestions by section
* [ ] Email verification
* [ ] Password reset
* [ ] Rate limiting
* [ ] Centralized error handling
* [ ] Cloud storage for resumes
* [ ] Docker support
* [ ] Frontend dashboard

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ashish Kumar Pal**

Built with ❤️ using Node.js, Express, MongoDB, and Gemini AI.
