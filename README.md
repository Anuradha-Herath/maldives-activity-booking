# 🏝️ Maldives Activity Booking Website

A comprehensive full-stack web application for booking tourist activities in the beautiful Maldives. This platform enables tourists to discover, book, and manage various activities including surfing, diving, snorkeling, and more, while providing administrators with powerful tools to manage activities, bookings, and users.

## ✨ Features

### 🎯 User Features
- **User Authentication**: Secure registration, login, and JWT-based authentication
- **Password Management**: Password reset functionality with email verification
- **Activity Browsing**: Explore available activities with detailed information and image galleries
- **Smart Booking System**: Book activities with date selection, participant count, and special requirements
- **User Dashboard**: Personal dashboard to view and manage bookings
- **Profile Management**: Update personal information and preferences
- **Booking Status Tracking**: Real-time status updates (pending, confirmed, cancelled, completed)
- **Responsive Design**: Fully responsive UI that works on all devices

### 🛠️ Admin Features
- **Admin Dashboard**: Comprehensive admin panel with analytics and overview
- **Activity Management**: Full CRUD operations for activities
- **Image Upload**: Cloudinary integration for activity photos and galleries
- **Booking Management**: View, update, and manage all user bookings
- **User Management**: Manage user accounts and permissions
- **Real-time Updates**: Instant booking status updates and notifications

### 🔐 Security Features
- **JWT Authentication**: Secure token-based authentication system
- **Role-based Access Control**: Separate permissions for users and administrators
- **Password Encryption**: Secure password hashing with bcrypt
- **Input Validation**: Comprehensive server-side validation
- **CORS Protection**: Configured CORS for secure cross-origin requests

## 🏗️ Project Architecture

### Frontend (Client)
```
client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and static resources
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── common/        # Shared components (Header, Footer, Navbar)
│   │   ├── home/          # Homepage components
│   │   └── ui/            # UI components and form elements
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.jsx # Authentication state management
│   ├── pages/             # Main application pages
│   │   ├── admin/         # Admin panel pages
│   │   ├── auth/          # Authentication pages
│   │   └── user/          # User dashboard pages
│   ├── services/          # API service functions
│   ├── utils/             # Utility functions and helpers
│   ├── App.jsx           # Main application component with routing
│   └── main.jsx          # Application entry point
```

### Backend (Server)
```
server/
├── config/               # Configuration files
│   └── database.js      # MongoDB connection setup
├── controllers/         # Request handlers and business logic
│   ├── activityController.js
│   ├── authController.js
│   ├── bookingController.js
│   └── userController.js
├── middleware/          # Custom middleware functions
│   ├── auth.js         # Authentication middleware
│   ├── upload.js       # File upload middleware
│   └── validation.js   # Input validation middleware
├── models/             # MongoDB data models
│   ├── Activity.js
│   ├── Booking.js
│   └── User.js
├── routes/             # API route definitions
│   ├── activities.js
│   ├── auth.js
│   ├── bookings.js
│   └── users.js
├── utils/              # Utility functions
│   ├── cloudinary.js   # Cloudinary configuration
│   └── email.js        # Email service setup
└── index.js           # Server entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd maldives-activity-booking
   ```

2. **Set up the server**:
   ```bash
   cd server
   npm install
   ```
   
   Create a `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Email Service (for password reset)
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. **Set up the client**:
   ```bash
   cd ../client
   npm install
   ```
   
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

### 🏃‍♂️ Running the Application

1. **Start the server** (from the server directory):
   ```bash
   npm run dev     # Development mode with nodemon
   # or
   npm start       # Production mode
   ```

2. **Start the client** (from the client directory):
   ```bash
   npm run dev     # Development server
   # or
   npm run build   # Build for production
   npm run preview # Preview production build
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### 👨‍💼 Admin Panel Access

To access the admin panel and test administrative features:

1. **Create an Admin Account**:
   - Register a new user account through the signup page
   - Manually update the user's role in MongoDB to 'admin':
   ```javascript
   // In MongoDB Compass or MongoDB shell
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Login with Admin Credentials**:
   - Use the admin account credentials to login
   - You will automatically be redirected to the admin dashboard

3. **Admin Panel Features**:
   - **Dashboard**: `/admin/dashboard` - Analytics and overview
   - **Activities Management**: `/admin/activities` - Create, edit, and delete activities
   - **Bookings Management**: `/admin/bookings` - View and manage all bookings
   - **Users Management**: `/admin/users` - Manage user accounts

4. **Admin Routes**:
   - All admin routes are protected and require admin role authentication
   - Non-admin users will be redirected to the home page if they try to access admin routes

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **React Context**: State management
- **React Hook Form**: Form handling and validation

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **Cloudinary**: Image upload and management
- **Nodemailer**: Email service
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Nodemon**: Development server auto-restart

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation

### Activity Endpoints
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create new activity (Admin)
- `PUT /api/activities/:id` - Update activity (Admin)
- `DELETE /api/activities/:id` - Delete activity (Admin)

### Booking Endpoints
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)

## 🔧 Environment Variables

### Server (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | Token expiration time | No |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `EMAIL_HOST` | SMTP host for emails | No |
| `EMAIL_PORT` | SMTP port | No |
| `EMAIL_USER` | Email username | No |
| `EMAIL_PASS` | Email password | No |
| `PORT` | Server port | No |
| `CLIENT_URL` | Frontend URL for CORS | No |

### Client (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# The built files will be in client/dist/
```

### Docker Support
The application can be containerized using Docker. Refer to the included Dockerfile and docker-compose.yml for containerization setup.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

*Built with ❤️ for travelers exploring the beautiful Maldives*