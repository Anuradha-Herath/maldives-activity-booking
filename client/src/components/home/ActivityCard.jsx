import React from 'react';

const ActivityCard = ({ activity }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-600">{activity.title}</h2>
                <p className="text-gray-700">{activity.description}</p>
                <p className="text-blue-500 font-bold">{activity.price} USD</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default ActivityCard;