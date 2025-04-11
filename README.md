# Maldives Activity Booking Website

Welcome to the Maldives Activity Booking Website project! This application is designed to help tourists discover and book various activities in the beautiful Maldives, including surfing, diving, snorkeling, and more.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using React and Vite, with Tailwind CSS for styling. Below is the structure of the client directory:

- **public/**: Contains static assets like the favicon and images.
- **src/**: Contains the main application code.
  - **assets/**: Static assets such as images or fonts.
  - **components/**: Reusable components for the application.
    - **common/**: Common components like Header, Footer, and Navbar.
    - **home/**: Components specific to the homepage, including ActivityCard, FeaturedActivities, and HeroSection.
  - **pages/**: Contains the main pages of the application, including Home and NotFound.
  - **App.jsx**: The main application component that sets up routing.
  - **index.css**: Global CSS styles.
  - **main.jsx**: The entry point for the React application.

### Server

The server is built using Node.js and connects to a MongoDB database. Below is the structure of the server directory:

- **config/**: Contains configuration files, including the database connection.
- **controllers/**: Contains the logic for handling requests related to activities.
- **models/**: Defines the data models for MongoDB.
- **routes/**: Contains the routes for activity-related endpoints.
- **index.js**: The entry point for the Node.js server, setting up middleware and routes.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd maldives-activity-booking
   ```

2. **Set up the server**:
   - Navigate to the `server` directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the `server` directory and add your MongoDB connection string:
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     ```
   - Start the server:
     ```
     npm start
     ```

3. **Set up the client**:
   - Navigate to the `client` directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the client:
     ```
     npm run dev
     ```

## Features

- Admin can list activities.
- Tourists can view activity profiles.
- Tourists can send booking requests with details like dates and number of tourists.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## License

This project is licensed under the MIT License.