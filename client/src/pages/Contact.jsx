import React from 'react';

const Contact = () => {
    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
            <p className="text-gray-700 mb-4">
                We'd love to hear from you! Whether you have questions about our activities, need help booking, or just want to give feedback, feel free to reach out.
            </p>
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-medium">Email</h2>
                    <p className="text-gray-600">support@maldivesactivities.com</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Phone</h2>
                    <p className="text-gray-600">+960 123 4567</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Address</h2>
                    <p className="text-gray-600">123 Paradise Island, Maldives</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
