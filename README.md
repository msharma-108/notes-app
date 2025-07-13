# My Workspace - Personal Productivity App

A fullstack web application that allows users to manage their notes and tasks in a personal workspace environment. Built with Next.js, MongoDB, and includes AI-powered note summarization features.

## Features

### 🔐 Authentication
- **Email/Password Registration & Login** - Secure user authentication system
- **Custom JWT Implementation** - Token-based authentication with session management
- **Protected Routes** - Dashboard and user data accessible only to authenticated users
- **Session Management** - Automatic logout on token expiration with graceful handling

### 📝 Notes Management
- **Create Notes** - Add new notes with title and content
- **Edit Notes** - Update existing notes in real-time
- **Delete Notes** - Remove notes with confirmation
- **AI Summarization** - Generate AI-powered summaries of note content

### ✅ Task Management
- **Add Tasks** - Create new tasks with descriptions
- **Update Tasks** - Edit task details and status
- **Mark Complete** - Toggle task completion status
- **Task Organization** - View all tasks in an organized interface

### 🎨 User Interface
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Clean Dashboard** - Intuitive navigation between Notes and Tasks
- **Modern UI** - Built with Tailwind CSS for a polished look
- **Tab Navigation** - Easy switching between Notes and Tasks sections

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | Custom JWT implementation |
| **State Management** | React useState hooks |
| **AI Integration** | Mock API calls (simulated OpenAI responses) |

## Project Structure

```
my-workspace/
├── app/
│   ├── api/
│   │   ├── addNote/
│   │   ├── addTask/
│   │   ├── checkAuth/
│   │   ├── deleteField/
│   │   ├── getData/
│   │   │        └── [id]/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── register/
│   │   └── toggleTaskStatus/
│   ├── dashboard/
│   │   └── page.jsx
│   ├── layout.js
│   └── page.jsx
├── models/
    └──userModel.js
├── utils/
│   └── mongo.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/myworkspace
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myworkspace
   
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Database Setup

The application will automatically create the necessary collections in MongoDB:
- `users` - User authentication and profile data
- `notes` - User notes with AI summary capabilities
- `tasks` - User task management data

## Development Approach

### Authentication Strategy
I implemented a custom JWT-based authentication system instead of NextAuth.js to have full control over the authentication flow. This approach provides:
- Custom token generation and validation
- Flexible session management
- Direct integration with MongoDB user storage
- Middleware-based route protection

### State Management
Used React's built-in `useState` hooks for state management, which provides:
- Simple and lightweight state handling
- Perfect for this app's scope
- Easy to understand and maintain
- No additional dependencies required

### AI Integration
Implemented mock AI calls to simulate OpenAI integration:
- Demonstrates the complete flow without API costs
- Easy to swap with real OpenAI API calls
- Includes proper async handling and loading states
- Provides realistic response simulation

### Database Design
MongoDB schema designed for user-specific data separation:
- User collection with secure password hashing
- Notes and tasks linked to user IDs
- Proper indexing for performance
- Flexible document structure for future enhancements
