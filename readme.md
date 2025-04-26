# Task Management System

An web application for managing tasks with user authentication, email verification, and task organization.

## Technologies Used

- **Frontend**:
  - React.js
  - React Router Dom
  - Axios for API calls

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Token) for authentication
  - Bcrypt for password hashing

- **Email Services**:
  - Resend API for email verification

## Features

### Implemented

- **User Authentication**
  - Registration with email verification via OTP
  - Secure login using JWT
  - Password hashing for security
  - Role-based authorization (admin and general users)

- **Task Management (API Only)**
  - Create tasks with title, description, due date, priority, and category
  - Retrieve tasks for logged-in users

### Pending

- Task editing functionality
- Task deletion
- Task filtering and sorting
- Task categories management
- User profile management
- Admin dashboard
- Task search functionality
- Task assignment to other users
- Task status tracking
- UI enhancements and responsiveness

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB running locally or a MongoDB Atlas account
- Git

### Installation

1. Clone the repository
``` bash
git clone https://github.com/shadabtanjeed/CSE-4539-Task-Management
cd CSE-4539-Task-Management
``` 
2. Set up the backend
``` bash
cd server
npm install
```
3. Create a `.env` file in the `server` directory and add the following environment variables:
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

4. Set up the front end
``` bash
// from the root directory
cd app
npm install
```
### Running the Application
1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend application
```bash
cd app
npm start
```
3. Open your browser and navigate to `http://localhost:3000` to access the application.

## How to Use

### User Registration and Authentication

1. **Sign Up**: 
- Navigate to `/signup` 
- Provide email, username, and password
- An OTP will be sent to your email
- Verify your email by entering the OTP

2. **Login**:
- Navigate to `/login`
- Enter your credentials
- Upon successful login, you'll be redirected to the dashboard

### Using the Backend API

The server runs on `http://localhost:5000` and provides the following endpoints:

1. **Authentication**
- Register: `POST /auth/add_user`
  ```json
  {
    "email": "user@example.com",
    "username": "user123",
    "password": "password123"
  }
  ```
- Login: `POST /auth/login`
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

2. **OTP Verification**
- Generate OTP: `POST /otp/generate_otp`
  ```json
  {
    "email": "user@example.com"
  }
  ```
- Verify OTP: `POST /otp/verify_otp`
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```

3. **Task Management** (Protected routes - require JWT token)
- Create Task: `POST /tasks/add-new-task`
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task management system",
    "dueDate": "2023-12-31T23:59:59Z",
    "priority": "high",
    "category": "work"
  }
  ```
- Get User Tasks: `GET /tasks/get-tasks`

## Testing with Postman

1. **Register a user** via the frontend or directly through the API
2. **Login** to get a JWT token
3. **For protected routes**, add the token to your request headers:

```
Authorization: Bearer your_jwt_token
```


## Future Improvements

See the "Pending" features list above for planned enhancements to the application.

## Important Note
Currently resend api only supports sending otp to the mail you used to open an account in thier platform.
Alternatively, you can view the generated otp from database and use that to verify.

