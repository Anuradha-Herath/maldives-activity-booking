import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white p-4 text-center footer">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} Maldives Activity Booking. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;