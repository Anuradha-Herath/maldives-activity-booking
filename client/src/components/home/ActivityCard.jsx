import React from 'react';

const ActivityCard = ({ activity }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col">
            <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{activity.title}</h2>
                <p className="text-gray-700 flex-grow">{activity.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-blue-500 font-bold">${activity.price} USD</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;