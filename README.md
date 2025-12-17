# 📦 Subscription Management API

A **secure, scalable RESTful API** built with **Node.js, Express, MongoDB, and JWT authentication** for managing users and their subscriptions. The system supports user authentication, subscription lifecycle management, upcoming renewal tracking, and API protection using **Arcjet**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User Signup, Signin, and Signout
- Password hashing using **bcryptjs**
- JWT-based authentication & protected routes

### 👤 User Management
- Get all users
- Get user by ID
- Update user email (authorized)
- Delete user account (authorized)

### 📄 Subscription Management
- Create subscription
- Get all subscriptions
- Get subscription by ID
- Get subscriptions by user ID
- Update subscription
- Delete subscription
- Cancel subscription
- Fetch upcoming renewals (next 7 days)

### 🛡️ Security & Protection
- **Arcjet Shield** (bot detection & rate limiting)
- Token Bucket rate limiting
- Environment-based configuration

### 🗄️ Database
- MongoDB with **Mongoose ODM**
- Schema validation & pre-save hooks
- Indexed relationships (User ↔ Subscription)

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT, bcryptjs, Arcjet
- **Environment Config:** dotenv
- **Architecture:** MVC Pattern

---

## 📁 Project Structure

```
├── config/
│   ├── arcjet.js
│   └── env.js
├── controller/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.middleware.js
│   ├── arcjet.middleware.js
│   └── error.middleware.js
├── model/
│   ├── user.model.js
│   └── subscription.model.js
├── routes/
│   ├── user.routes.js
│   └── subscription.routes.js
├── database/
│   └── connectDB.js
└── server.js
```

---

## ⚙️ Environment Variables

Create an environment file:

```
.env.development.local
```

Add the following:

```env
PORT=3000
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ARCJET_KEY=your_arcjet_key
ARCJET_ENVIRONMENT=development
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/subscription-management-api.git
cd subscription-management-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Server
```bash
npm run dev
```

Server will start at:
```
http://localhost:3000
```

---

## 🔑 API Highlights

### Auth Routes
- `POST /auth/signup`
- `POST /auth/signin`

### User Routes
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

### Subscription Routes
- `POST /subscriptions`
- `GET /subscriptions`
- `GET /subscriptions/:id`
- `PUT /subscriptions/:id`
- `DELETE /subscriptions/:id`
- `PUT /subscriptions/user/:userId/cancel`
- `GET /subscriptions/upcoming-renewals`

---

## 🧠 Key Concepts Implemented

- MVC Architecture
- RESTful API Design
- JWT Authentication & Middleware
- Rate Limiting & Bot Protection
- Mongoose Validation & Hooks
- Secure Error Handling

---

## 📌 Future Enhancements

- Role-based access control (Admin/User)
- Payment gateway integration
- Email notifications for renewals
- Swagger API documentation
- Dockerization

---

## 👨‍💻 Author

**Abdul Lahad**  
Software Engineering Graduate | Backend Developer

---

⭐ If you like this project, don’t forget to star the repository!

