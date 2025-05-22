import React from 'react';
import { Link } from 'react-router-dom';

const RelatedActivities = ({ activities }) => {
    if (!activities || activities.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 font-display">You Might Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.map(activity => (                    <Link 
                        to={`/activities/${activity._id}`} 
                        key={activity._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <img 
                                src={activity.image} 
                                alt={activity.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full font-bold">
                                ${activity.price}
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{activity.title}</h3>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-600">{activity.rating}</span>
                                <span className="ml-1 text-xs text-gray-500">({activity.reviewCount})</span>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{activity.description}</p>
                            <div className="text-blue-600 text-sm font-medium">View Details &rarr;</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedActivities;
