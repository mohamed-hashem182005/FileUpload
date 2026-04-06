<div align="center">

# 🖼️ FileUpload — Image Upload API

### A Secure REST API for Uploading & Managing Images with Multer and Cloudinary

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)](https://mongoosejs.com/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary)](https://cloudinary.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)](https://jwt.io/)
[![Multer](https://img.shields.io/badge/Upload-Multer-red)](https://github.com/expressjs/multer)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 About The Project

**FileUpload** is a focused Node.js REST API project that demonstrates how to handle **image file uploads** in a secure and production-ready way. It combines **Multer** for handling multipart/form-data, **Cloudinary** for cloud-based image storage and delivery, **JWT** for authentication, and **bcryptjs** for secure password management.

Images uploaded through the API are stored directly on **Cloudinary's CDN**, making them instantly accessible via fast, optimized URLs — no local disk storage needed.

> 💡 This project was built to learn and master file upload workflows in Node.js, a key skill for any full-stack developer building real-world applications.

---

## ✨ Features

- ✅ **Image Upload to Cloudinary** — Files are uploaded directly to Cloudinary's cloud CDN
- ✅ **Multer Integration** — Handles `multipart/form-data` for file uploads
- ✅ **JWT Authentication** — Protected routes with Bearer token auth
- ✅ **Password Hashing** — Secure user passwords with `bcryptjs`
- ✅ **MongoDB Integration** — Image metadata stored in MongoDB via Mongoose
- ✅ **Config Management** — Cloudinary & DB config cleanly separated in `config/`
- ✅ **Helper Utilities** — Reusable helper functions in `helpers/`
- ✅ **Custom Middleware** — Auth middleware for protecting upload routes
- ✅ **MVC Architecture** — Clean separation with models, controllers, and routes
- ✅ **Environment Config** — All secrets managed via `dotenv`

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js v5 |
| **Database** | MongoDB via Mongoose |
| **Cloud Storage** | Cloudinary |
| **File Handling** | Multer |
| **Authentication** | JSON Web Tokens (JWT) |
| **Password Security** | bcryptjs |
| **Config** | dotenv |
| **Dev Tool** | Nodemon |

---

## 📁 Project Structure

```
FileUpload/
│
├── config/               # Configuration files
│   └── cloudinary.js     # Cloudinary SDK setup & connection
│
├── controllers/          # Business logic & request handlers
│   ├── imageController.js   # Upload, get, delete image logic
│   └── userController.js    # User register & login logic
│
├── database/             # Database connection
│   └── db.js             # MongoDB connection via Mongoose
│
├── helpers/              # Reusable utility/helper functions
│   └── imageHelper.js    # Cloudinary upload & delete helpers
│
├── middleware/           # Custom Express middleware
│   └── authMiddleware.js # JWT token verification
│
├── models/               # Mongoose schemas & models
│   ├── imageModel.js     # Image schema (url, publicId, owner)
│   └── userModel.js      # User schema (name, email, password)
│
├── routes/               # Express route definitions
│   ├── imageRoutes.js    # Image upload/fetch/delete routes
│   └── userRoutes.js     # Auth routes (register/login)
│
├── server.js             # Main application entry point
├── package.json          # Project metadata & dependencies
├── .gitignore            # Files excluded from version control
├── .env                  # Environment variables (not committed)
└── README.md             # Project documentation
```

---

## ⚙️ How It Works

```
Client Request
     │
     ▼
Express Server (server.js)
     │
     ▼
Auth Middleware ──── ❌ Invalid Token → 401 Unauthorized
     │ ✅ Valid Token
     ▼
Route Handler (routes/)
     │
     ▼
Multer Middleware ──── Parses multipart/form-data
     │
     ▼
Controller (controllers/)
     │
     ▼
Cloudinary Helper ──── Uploads image to Cloudinary CDN
     │
     ▼
MongoDB (models/) ──── Saves image URL & metadata
     │
     ▼
JSON Response ──── Returns image URL to client
```

---

## 📦 Prerequisites

Make sure you have the following installed and ready:

- [Node.js](https://nodejs.org/) `v18` or higher
- [npm](https://www.npmjs.com/) `v9` or higher
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Cloudinary Account](https://cloudinary.com/) — free tier is sufficient
- [Git](https://git-scm.com/)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamed-hashem182005/FileUpload
```

### 2. Navigate into the project directory

```bash
cd FileUpload
```

### 3. Install all dependencies

```bash
npm install
```

### 4. Set up environment variables

Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) below).

### 5. Start the development server

```bash
npm run dev
```

The API will be running at **http://localhost:3000**

---

## 🔐 Environment Variables

Create a `.env` file in the root of your project:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fileupload
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.
>
> 🔑 Get your Cloudinary credentials at [cloudinary.com/console](https://cloudinary.com/console)

---

## 🔌 API Endpoints

### 👤 Users (Authentication)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/users/register` | Register a new user | ❌ Public |
| `POST` | `/api/users/login` | Login and receive JWT token | ❌ Public |

### 🖼️ Images

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/images/upload` | Upload an image to Cloudinary | ✅ Required |
| `GET` | `/api/images` | Get all uploaded images for user | ✅ Required |
| `GET` | `/api/images/:id` | Get a single image by ID | ✅ Required |
| `DELETE` | `/api/images/:id` | Delete an image from Cloudinary & DB | ✅ Required |

---

### Example — Upload an Image

```http
POST /api/images/upload
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Body:
  image: [select file]
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "image": {
      "_id": "64abc123...",
      "url": "https://res.cloudinary.com/your_cloud/image/upload/v123/sample.jpg",
      "publicId": "fileupload/sample",
      "owner": "64xyz789...",
      "createdAt": "2026-04-06T10:00:00.000Z"
    }
  }
}
```

### Example — Register a User

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Mohamed Hashem",
  "email": "mohamed@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "64abc123...",
      "name": "Mohamed Hashem",
      "email": "mohamed@example.com"
    }
  }
}
```

---

## 🔑 Authentication

This API uses **JWT (JSON Web Token)** for stateless authentication.

1. **Register** → `POST /api/users/register`
2. **Login** → `POST /api/users/login` — receive your JWT token
3. **Use the token** in all protected requests:

```http
Authorization: Bearer <your_jwt_token>
```

The `authMiddleware` verifies the token on every protected route before allowing access to upload or retrieve images.

---

## 🗺 Roadmap

- [ ] 🗂 Support multiple file uploads in a single request
- [ ] 📐 Add image resizing and transformation via Cloudinary API
- [ ] 🏷 Add image tags and categories
- [ ] 🔍 Add search/filter for uploaded images
- [ ] 📄 Add pagination for image listing
- [ ] 🧪 Add unit and integration tests (Jest / Supertest)
- [ ] 🐳 Add Docker support for easy deployment
- [ ] ☁️ Deploy to Render or Railway

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** and describe your changes

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Mohamed Hashem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Mohamed Hashem**

- GitHub: [@mohamed-hashem182005](https://github.com/mohamed-hashem182005)

---

<div align="center">

⭐ **If you find this project helpful, please give it a star!** ⭐

*Built with ❤️ as part of a Node.js backend development journey.*

</div>
