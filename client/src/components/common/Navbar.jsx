import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Maldives Activities</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-white hover:text-blue-300">Home</a>
                    </li>
                    <li>
                        <a href="/activities" className="text-white hover:text-blue-300">Activities</a>
                    </li>
                    <li>
                        <a href="/about" className="text-white hover:text-blue-300">About</a>
                    </li>
                    <li>
                        <a href="/contact" className="text-white hover:text-blue-300">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;