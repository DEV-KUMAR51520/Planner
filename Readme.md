Based on the provided repository structure and file contents, here is a comprehensive, professional README for your **Travel Planner** application.

### Travel Planner

A full-stack travel planning and booking application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to explore top destinations, manage bookings, write reviews, and receive email notifications.

---

### 🚀 Features

* **User Authentication**: Secure signup and login with password reset functionality using OTPs via email.
* **Destination Exploration**: Browse top-rated and trending travel destinations.
* **Booking Management**: Users can create, update, and view their travel bookings.
* **Admin Dashboard**: Comprehensive management of users, bookings, and customer queries.
* **Review System**: Integrated feedback mechanism for users to rate and review their trips.
* **Support System**: Query and ticket management system for customer support.
* **Modern Frontend**: Interactive UI built with React 19, Vite, Framer Motion for animations, and Tailwind CSS for styling.
* **Email Notifications**: Automated email templates and mailer utility using Nodemailer.

---

### 🛠️ Tech Stack

**Frontend:**
* React 19 & Vite
* Tailwind CSS
* Framer Motion & ScrollReveal (Animations)
* Lucide React & React Icons
* Axios (API Requests)

**Backend:**
* Node.js & Express
* MongoDB with Mongoose ODM
* Bcrypt (Password Hashing)
* Nodemailer (Email Service)
* Dotenv (Environment Configuration)

---

### 📋 Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB instance (local or Atlas)
* npm or yarn

---

### ⚙️ Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Planner
```

#### 2. Backend Configuration
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```
Run the server:
```bash
npm run dev
```

#### 3. Frontend Configuration
Navigate to the frontend directory and install dependencies:
```bash
cd ../Frontend
npm install
```
Run the development server:
```bash
npm run dev
```

---

### 📡 API Endpoints Summary

| Category | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | `POST /api/auth/signup` | Register a new user |
| **Auth** | `POST /api/auth/login` | Authenticate user |
| **Booking** | `POST /api/booking/save` | Create/Update a booking |
| **Admin** | `GET /api/admin/users` | Retrieve all registered users |
| **Review** | `GET /api/review/all` | Fetch all destination reviews |
| **Query** | `POST /api/query/submit` | Submit a support ticket |

---

### 📁 Project Structure

* `Frontend/`: React application with Vite, containing components for bookings, destination details, and user profiles.
* `backend/`: Express server with modular routes for auth, bookings, and admin tasks.
* `backend/models/`: Mongoose schemas for Users, Bookings, Reviews, and Destinations.
* `backend/utils/`: Utility functions for mailing and security.

---

### 📄 License

This project is licensed under the **ISC License**