import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomPackages = () => {
    const [activeTab, setActiveTab] = useState('created');

    // Dummy custom packages data
    const createdPackages = [
        {
            id: 1,
            name: "My Romantic Getaway",
            duration: "5 Days 4 Nights",
            totalPrice: 3200,
            status: "Draft",
            createdDate: "2024-01-15",
            items: [
                { type: "accommodation", name: "Paradise Resort Ocean View Room", price: 1800 },
                { type: "activity", name: "Sunset Dolphin Cruise", price: 170 },
                { type: "activity", name: "Spa & Wellness Retreat", price: 400 }
            ]
        },
        {
            id: 2,
            name: "Family Adventure Package",
            duration: "7 Days 6 Nights",
            totalPrice: 4500,
            status: "Published",
            createdDate: "2024-01-10",
            items: [
                { type: "accommodation", name: "Family Beach Villa", price: 3000 },
                { type: "activity", name: "Island Hopping Tour", price: 380 },
                { type: "activity", name: "Scuba Diving Adventure", price: 480 }
            ]
        }
    ];

    const bookmarkedPackages = [
        {
            id: 3,
            name: "Luxury Escape by Sarah",
            author: "Sarah Johnson",
            duration: "4 Days 3 Nights",
            price: 5200,
            rating: 4.9,
            bookmarkedDate: "2024-01-12"
        }
    ];

    const handleDeletePackage = (id) => {
        if (window.confirm('Are you sure you want to delete this custom package?')) {
            // Handle delete logic here
            alert('Package deleted successfully!');
        }
    };

    const handleDuplicatePackage = (id) => {
        alert('Package duplicated! You can now edit the copy.');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Draft': return 'bg-yellow-100 text-yellow-800';
            case 'Published': return 'bg-green-100 text-green-800';
            case 'Private': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Custom Travel Packages</h1>
                    <Link
                        to="/custom-packages/create"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ➕ Create New Package
                    </Link>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('created')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'created'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                My Packages ({createdPackages.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('bookmarked')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'bookmarked'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Bookmarked ({bookmarkedPackages.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Created Packages Tab */}
                {activeTab === 'created' && (
                    <div className="space-y-6">
                        {createdPackages.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-semibold mb-2">No Custom Packages Yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Create your first custom travel package by combining accommodations and activities.
                                </p>
                                <Link
                                    to="/custom-packages/create"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                                >
                                    Create Your First Package
                                </Link>
                            </div>
                        ) : (
                            createdPackages.map(pkg => (
                                <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>📅 {pkg.duration}</span>
                                                    <span>💰 ${pkg.totalPrice}</span>
                                                    <span>📅 Created: {new Date(pkg.createdDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pkg.status)}`}>
                                                    {pkg.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Package Items */}
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Package Includes:</h4>
                                            <div className="space-y-2">
                                                {pkg.items.map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                        <div className="flex items-center">
                                                            <span className="mr-2">
                                                                {item.type === 'accommodation' ? '🏨' : '🎯'}
                                                            </span>
                                                            <span className="text-sm">{item.name}</span>
                                                        </div>
                                                        <span className="text-sm font-medium">${item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDuplicatePackage(pkg.id)}
                                                    className="text-green-600 hover:text-green-800 text-sm"
                                                >
                                                    📋 Duplicate
                                                </button>
                                                <button className="text-purple-600 hover:text-purple-800 text-sm">
                                                    📤 Share
                                                </button>
                                                <button 
                                                    onClick={() => handleDeletePackage(pkg.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">
                                                    Preview
                                                </button>
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                                    Book Package
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Bookmarked Packages Tab */}
                {activeTab === 'bookmarked' && (
                    <div className="space-y-6">
                        {bookmarkedPackages.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <div className="text-6xl mb-4">🔖</div>
                                <h3 className="text-xl font-semibold mb-2">No Bookmarked Packages</h3>
                                <p className="text-gray-600 mb-6">
                                    Browse other users' custom packages and bookmark your favorites for inspiration.
                                </p>
                                <Link
                                    to="/custom-packages/browse"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                                >
                                    Browse Packages
                                </Link>
                            </div>
                        ) : (
                            bookmarkedPackages.map(pkg => (
                                <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">Created by {pkg.author}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>📅 {pkg.duration}</span>
                                                    <span>💰 ${pkg.price}</span>
                                                    <div className="flex items-center">
                                                        <span className="text-yellow-400">⭐</span>
                                                        <span className="ml-1">{pkg.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    Bookmarked: {new Date(pkg.bookmarkedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <div className="flex gap-2">
                                                <button className="text-red-600 hover:text-red-800 text-sm">
                                                    🔖 Remove Bookmark
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    📋 Use as Template
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">
                                                    View Details
                                                </button>
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                                    Book Package
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-12 bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">How Custom Packages Work</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-medium mb-2">1. Create</h4>
                            <p className="text-sm text-gray-600">
                                Browse accommodations and activities, then add them to your custom package.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">2. Customize</h4>
                            <p className="text-sm text-gray-600">
                                Adjust dates, group sizes, and special requirements to match your preferences.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">3. Book</h4>
                            <p className="text-sm text-gray-600">
                                Once satisfied, proceed with booking your entire custom package at once.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPackages;
