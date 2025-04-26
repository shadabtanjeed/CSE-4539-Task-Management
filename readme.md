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
  - Resend API for email verification (navigate to ```Important Notes Section```)

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
  - Filter and sort tasks
  - Ability to search for specific task
  - View task details with the option to update it
  - Task Deletion


### Pending

- Admin Panel Implementation

### Screenshots
### Home page 

![Image](https://github.com/user-attachments/assets/815fc1db-d0d9-484a-bc26-39c26037e422)

### Search

![Image](https://github.com/user-attachments/assets/1600f58e-afc5-4d72-82d5-e8f5e892ebb1)

### Add new task

![Image](https://github.com/user-attachments/assets/ab3ad2e7-07e1-4fa4-80ac-201880422f22)

### Task Details

![Image](https://github.com/user-attachments/assets/3ba15eee-7e19-448c-b09c-77f46c2b5fb0)


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

**P.S** Make sure MongoDB is installed on your sysyem. 

## Important Note
Currently resend api only supports sending otp to the mail you used to open an account in thier platform.
Alternatively, you can view the generated otp from database and use that to verify.

