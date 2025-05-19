import React from 'react';
import { Link } from 'react-router-dom';

const ActivityListItem = ({ activity }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
            {/* Activity Image */}
            <div className="sm:w-1/3 h-48 sm:h-auto relative">
                <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                />
                {activity.featured && (
                    <span className="absolute top-3 left-0 bg-yellow-500 text-blue-900 py-1 px-3 font-semibold text-xs uppercase">
                        Featured
                    </span>
                )}
            </div>
            
            {/* Activity Details */}
            <div className="p-5 flex flex-col flex-grow sm:w-2/3">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-blue-700">{activity.title}</h2>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-800 font-medium">{activity.rating}</span>
                        <span className="ml-1 text-gray-500 text-sm">({activity.reviewCount})</span>
                    </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                        {activity.type}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                        {activity.duration} hour{activity.duration !== 1 ? 's' : ''}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">
                        {activity.location}
                    </span>
                </div>
                
                <p className="text-gray-600 my-3 line-clamp-2">{activity.description}</p>
                
                <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100">
                    <div>
                        <div className="text-blue-800 font-bold text-xl">${activity.price}</div>
                        <div className="text-gray-500 text-sm">per person</div>
                    </div>
                    
                    <Link 
                        to={`/activities/${activity.id}`}
                        className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActivityListItem;
