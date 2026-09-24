# Job Portal

A full-stack MERN job portal that connects job seekers with recruiters. Job seekers browse and apply to listings with a resume on file; recruiters (companies) register, post jobs, and manage incoming applications from their own dashboard.

**Live demo:** https://job-portal-frontend-nu-ten.vercel.app/
**API base URL:(https://job-portal-backend-woad-psi.vercel.app/)

---

## Features

### For job seekers
- Sign in / sign up via [Clerk](https://clerk.com) (email, social login, etc.)
- Browse jobs with search (title, location) and category/location filters
- Paginated job listings
- View full job details with a rich-text description
- Upload a resume (PDF) and view it inline without leaving the app
- Apply to jobs and track application status (Pending / Accepted / Rejected)

### For recruiters
- Separate recruiter registration/login (email + password, with company logo upload)
- Post new jobs with a rich-text editor ([Quill](https://quilljs.com)) for the description
- Manage posted jobs — toggle visibility on/off
- View applicants per job, with resume access
- Accept or reject applications

---

## Tech stack

**Frontend**
- React 19 + Vite
- Tailwind CSS
- React Router
- Clerk (`@clerk/react`) for job-seeker authentication
- Axios for API calls
- Quill for rich-text job descriptions
- React Toastify for notifications
- Moment.js for date formatting
- Lucide React for icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Clerk (`@clerk/express`) for verifying job-seeker sessions, plus Svix-verified webhooks to sync Clerk users into MongoDB
- Custom JWT + bcrypt auth for recruiter/company accounts
- Cloudinary for company logos and resume storage
- Multer for handling multipart file uploads
- Sentry for error monitoring

**Deployment**
- Configured for Vercel (see `Backend/vercel.json`)

---

## Project structure

```
JOB-PORTAL-main/
├── Backend/
│   ├── config/          # DB, Cloudinary, Multer, Sentry setup
│   ├── controllers/     # Route handlers (jobs, company, user, webhooks)
│   ├── middleware/      # Recruiter JWT auth middleware
│   ├── models/          # Mongoose schemas (User, Company, Job, JobApplication)
│   ├── routes/          # Express routers
│   ├── utils/           # Token generation helper
│   └── server.js        # App entry point
└── Frontend/
    └── job_portal/
        ├── src/
        │   ├── Components/   # Navbar, Joblisting, Jobcard, Footer, etc.
        │   ├── Context/      # Global app state (AppContext)
        │   ├── Pages/        # Home, Applyjobs, Application, Dashboard, ...
        │   └── assets/       # Images, icons, static data
        └── vite.config.js
```

---

## Getting started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Clerk](https://clerk.com) application (for job-seeker auth)
- A [Cloudinary](https://cloudinary.com) account (for image/resume storage)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd JOB-PORTAL-main
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
```

Run the server:
```bash
npm run server   # nodemon, for development
# or
npm start        # plain node
```

> **Note:** In your Clerk dashboard, point the webhook endpoint to `<your-backend-url>/webhooks` and select the `user.created`, `user.updated`, and `user.deleted` events — this is what keeps MongoDB in sync with Clerk user records.

### 3. Frontend setup
```bash
cd Frontend/job_portal
npm install
```

Create a `.env` file in `Frontend/job_portal/` with:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Run the dev server:
```bash
npm run dev
```

---

## API overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/jobs` | — | Get all visible jobs |
| GET | `/api/jobs/:id` | — | Get a single job |
| POST | `/api/company/register` | — | Register a new company (multipart, includes logo) |
| POST | `/api/company/login` | — | Company login |
| GET | `/api/company/company` | Recruiter (JWT) | Get logged-in company's profile |
| POST | `/api/company/post-job` | Recruiter (JWT) | Post a new job |
| GET | `/api/company/list-jobs` | Recruiter (JWT) | Get jobs posted by the company |
| GET | `/api/company/applicants` | Recruiter (JWT) | Get applicants across the company's jobs |
| POST | `/api/company/change-status` | Recruiter (JWT) | Accept/reject an application |
| POST | `/api/company/change-visiblity` | Recruiter (JWT) | Toggle a job's visibility |
| GET | `/api/user/user` | Job seeker (Clerk) | Get logged-in user's profile |
| GET | `/api/user/resume` | Job seeker (Clerk) | Stream the user's resume as a PDF |
| POST | `/api/user/apply` | Job seeker (Clerk) | Apply to a job |
| GET | `/api/user/applications` | Job seeker (Clerk) | Get the user's applications |
| POST | `/api/user/update-resume` | Job seeker (Clerk) | Upload/replace resume (multipart) |
| POST | `/webhooks` | Svix signature | Clerk user sync webhook |

Recruiter-protected routes expect a `token` header containing the JWT issued at login/registration. Job-seeker-protected routes expect a standard `Authorization: Bearer <clerk_session_token>` header.

---

## License

This project is for educational/portfolio purposes.
