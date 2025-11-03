# Brainify - Full-Stack Quiz Application

A comprehensive full-stack quiz application built with Next.js and MongoDB. Teachers can create and manage quizzes, while students can take quizzes and track their results with detailed analytics.

## Features

- **User Authentication**: Secure registration and login for students and teachers
- **Quiz Management**: Teachers can create, edit, and manage quizzes
- **Quiz Taking**: Students can take quizzes with a timer and progress tracking
- **Analytics**: Real-time analytics showing student performance, average scores, and more
- **Results Tracking**: Students can view their quiz history and scores
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Session-based with secure password hashing

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

## Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd brainify
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   - **macOS**: `brew services start mongodb-community`
   - **Windows**: MongoDB should start automatically after installation
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/brainify
MONGODB_DB_NAME=brainify

# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brainify?retryWrites=true&w=majority
# MONGODB_DB_NAME=brainify
\`\`\`

**Important**: Replace the values with your actual MongoDB connection details.

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

## Database Schema

### Users Collection

\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "student" | "teacher" | "admin",
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Quizzes Collection

\`\`\`javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  questions: [
    {
      _id: ObjectId,
      question: String,
      options: [String, String, String, String],
      answer: String
    }
  ],
  createdBy: String (teacher email),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Results Collection

\`\`\`javascript
{
  _id: ObjectId,
  studentEmail: String,
  quizId: String,
  quizTitle: String,
  score: Number,
  total: Number,
  answers: [
    {
      questionId: String,
      selectedAnswer: String,
      isCorrect: Boolean
    }
  ],
  timestamp: Date
}
\`\`\`

### Sessions Collection

\`\`\`javascript
{
  _id: ObjectId,
  userId: String (email),
  token: String,
  expiresAt: Date,
  createdAt: Date
}
\`\`\`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify` - Verify session token

### Quiz Management

- `POST /api/quiz/create` - Create a new quiz (teacher only)
- `GET /api/quiz/get-all` - Get all active quizzes
- `POST /api/quiz/get-by-teacher` - Get quizzes created by a teacher
- `GET /api/quiz/get/[id]` - Get a specific quiz
- `POST /api/quiz/update-status` - Update quiz active status
- `POST /api/quiz/delete` - Delete a quiz

### Results & Analytics

- `POST /api/result/submit` - Submit quiz answers
- `POST /api/result/get-by-student` - Get student's results
- `POST /api/result/get-by-quiz` - Get all results for a quiz with analytics
- `GET /api/result/get-detail/[id]` - Get detailed result information

## Usage

### For Teachers

1. **Register/Login**: Create an account or login as a teacher
2. **Create Quiz**: Navigate to "Create Quiz" and add questions with multiple choice options
3. **Manage Quizzes**: View all your quizzes, start/end them, and delete if needed
4. **View Analytics**: See student responses, average scores, highest/lowest scores for each quiz

### For Students

1. **Register/Login**: Create an account or login as a student
2. **Browse Quizzes**: View all available active quizzes
3. **Take Quiz**: Click "Start Quiz" to begin, answer questions within the time limit
4. **View Results**: Check your quiz history and scores in "My Results"

## Project Structure

\`\`\`
brainify/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── verify/route.ts
│   │   ├── quiz/
│   │   │   ├── create/route.ts
│   │   │   ├── get-all/route.ts
│   │   │   ├── get-by-teacher/route.ts
│   │   │   ├── get/[id]/route.ts
│   │   │   ├── update-status/route.ts
│   │   │   └── delete/route.ts
│   │   └── result/
│   │       ├── submit/route.ts
│   │       ├── get-by-student/route.ts
│   │       ├── get-by-quiz/route.ts
│   │       └── get-detail/[id]/route.ts
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── teacher-dashboard/
│   │   ├── page.tsx
│   │   └── create-quiz/page.tsx
│   ├── student-dashboard/page.tsx
│   ├── quiz/[id]/page.tsx
│   └── layout.tsx
├── lib/
│   ├── mongodb.ts
│   ├── db-models.ts
│   ├── auth-utils.ts
│   └── api-client.ts
├── components/
│   └── ui/
├── .env.local
└── package.json
\`\`\`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/brainify` |
| `MONGODB_DB_NAME` | Database name | `brainify` |

## Troubleshooting

### MongoDB Connection Error

**Problem**: `MONGODB_URI environment variable is not set`

**Solution**: Ensure `.env.local` file exists in the root directory with the correct `MONGODB_URI` value.

### Connection Refused

**Problem**: `connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: 
- Ensure MongoDB is running locally or check your MongoDB Atlas connection string
- For local MongoDB: `brew services start mongodb-community` (macOS)

### Authentication Errors

**Problem**: `Invalid credentials` or `User not found`

**Solution**:
- Verify you're using the correct email and password
- Ensure you're logging in with the correct role (student/teacher)
- Check that the user was successfully registered

### Quiz Not Found

**Problem**: `Quiz not found` when trying to take a quiz

**Solution**:
- Ensure the quiz is active (teacher must start it)
- Verify the quiz ID is correct
- Check that the quiz hasn't been deleted

## Performance Optimization

- Database queries are optimized with proper indexing
- Session tokens expire after 30 days
- Quiz timer is client-side with server-side validation
- Results are calculated and cached on submission

## Security Features

- Passwords are hashed using SHA-256
- Session-based authentication with token validation
- CORS protection on API routes
- Input validation on all endpoints
- Copy/paste disabled during quiz taking

## Future Enhancements

- OAuth integration (Google, GitHub)
- Email verification for registration
- Password reset functionality
- Quiz categories and tags
- Student groups/classes
- Detailed performance reports
- Export results to CSV
- Quiz scheduling
- Question bank management

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
5. Deploy

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

Ensure MongoDB is accessible from your deployment environment.

## Changelog

### Version 1.0.0
- Initial release with full-stack MongoDB integration
- Authentication system
- Quiz creation and management
- Results tracking and analytics
- Responsive UI with Tailwind CSS
