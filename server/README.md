# 📡 ServiceMatch — Express & MongoDB Backend Server

This directory contains the robust REST API backend powering the ServiceMatch hospitality job portal. It is built using Node.js (ES Modules), Express, Mongoose, and Google Gemini AI.

---

## 🛠️ Architecture & Core Components

```
server/
├── config/            # Configurations (MongoDB connection script)
├── controllers/       # Controller handlers matching route actions
├── middleware/        # Request handlers (Security, Auth Token Filters)
├── models/            # Mongoose Schemas (User, Job, HotelProfile, Application)
├── routes/            # API Route Mappings
├── utils/             # Helper libraries (Firebase Admin SDK & Gemini AI instances)
└── server.js          # Main entry file
```

---

## 🔑 Database Schemas (MongoDB via Mongoose)

### 1. User Model (`models/userModel.js`)
Stores the primary authentication, login credentials, contact data, and base roles of all members.
*   `name`: String (Required)
*   `email`: String (Unique, Required)
*   `password`: String (Hashed, Required)
*   `role`: String (Enum: `'waiter'`, `'hotel'`, `'admin'`, Required)
*   `phoneNumber`: String
*   `isVerified`: Boolean (Default: `false` for security checks)
*   `createdAt`: Timestamp

### 2. Job Model (`models/Job.js`)
Defines the detailed parameters of an active hospitality shift posted by an employer.
*   `hotelId`: Schema.Types.ObjectId (Ref: `'User'`, Required)
*   `title`: String (Required)
*   `description`: String (Required)
*   `location`: String (Must match autocomplete cities, Required)
*   `salary`: Number (Required daily rate)
*   `shiftType`: String (Enum: `'Day'`, `'Night'`, `'Custom'`)
*   `dressCode`: String
*   `requirements`: [String] (Key skills or attire needed)
*   `spotsAvailable`: Number (Default: `1`)
*   `createdAt`: Timestamp

### 3. Hotel Profile Model (`models/HotelProfile.js`)
Contains the brand representation and marketing card details for hospitality employers.
*   `userId`: Schema.Types.ObjectId (Ref: `'User'`, Unique, Required)
*   `hotelName`: String (Required)
*   `description`: String
*   `location`: String
*   `amenities`: [String]
*   `images`: [String] (Firebase Storage urls)
*   `contactEmail`: String
*   `contactPhone`: String

### 4. Application Model (`models/Application.js`)
Acts as a bridge entity connecting a candidate waiter to a specific open shift.
*   `jobId`: Schema.Types.ObjectId (Ref: `'Job'`, Required)
*   `waiterId`: Schema.Types.ObjectId (Ref: `'User'`, Required)
*   `status`: String (Enum: `'Applied'`, `'Shortlisted'`, `'Interview'`, `'Hired'`, `'Rejected'`)
*   `coverLetter`: String
*   `appliedAt`: Timestamp

---

## 📡 Complete REST API Endpoints

### 🔒 User Authentication (`/api/auth`)
*   `POST /api/auth/signup` - Registers credentials, initiates role flags.
*   `POST /api/auth/login` - Validates passwords, returns custom signed JWT.
*   `POST /api/auth/otp/send` - Contacts verified identity gateways to dispatch security SMS pins.
*   `POST /api/auth/otp/verify` - Verifies user response pins and unlocks full portal access.

### 💼 Hospitality Shifts (`/api/jobs`)
*   `GET /api/jobs` - Return active shifts. Optional filters: `location`, `salary`, `search`.
*   `POST /api/jobs` - Creates an active job. *(Requires Authenticated Employer)*
*   `GET /api/jobs/:id` - Return full parameters of a specific listing.
*   `PUT /api/jobs/:id` - Edit salary/attire metrics. *(Requires Listing Owner)*
*   `DELETE /api/jobs/:id` - Archive the active job posting. *(Requires Listing Owner)*

### 📝 Applications Pipeline (`/api/applications`)
*   `POST /api/applications/apply` - Submits active profiles to a job. *(Requires Waiter Auth)*
*   `GET /api/applications/my-applications` - Retrieves waiter's historical applications. *(Requires Waiter Auth)*
*   `GET /api/applications/jobs/:jobId` - Fetch candidate list for a specific post. *(Requires Hotel Auth)*
*   `PATCH /api/applications/:id/status` - Updates selection status. *(Requires Hotel Auth)*

### 🤖 Intelligent Chatbot Integration (`/chat`)
*   `POST /chat` - Seamless conversation with Google Gemini Pro API. Sends the chat history array to return highly contextual feedback on writing resumes or preparing for hospitality job interviews.

---

## 🛡️ Middlewares

1.  **Auth Guard (`middleware/auth.js`)**: Parses the request Header `Authorization: Bearer <token>`, validates the signature against `JWT_SECRET`, extracts the payload payload `userId`/`role` and attaches it to `req.user`.
2.  **Role Verification (`middleware/role.js`)**: Intercepts paths to guarantee that only `'hotel'` or `'waiter'` users can access specific endpoints.
3.  **Global Error Boundary (`server.js`)**: Gracefully catches uncaught asynchronous or standard errors and outputs clean, standard JSON responses `status: 500, success: false`.

---

## 🚀 Commands & Development Setup

### Install dependencies:
```bash
# Using npm
npm install

# Using bun
bun install
```

### Setup environment variables (`.env`):
Create a `.env` in the current folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ServiceMatch
JWT_SECRET=your_jwt_signing_secret_phrase
GEMINI_API_KEY=your_google_ai_gemini_api_key
```

### Launch local server:
```bash
# Development Mode (uses nodemon)
npm run dev

# Production Mode
npm start
```
