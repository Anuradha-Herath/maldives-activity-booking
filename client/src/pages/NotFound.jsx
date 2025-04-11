import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mx-auto py-10 text-center">
            <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
            <p className="mb-4">The page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;