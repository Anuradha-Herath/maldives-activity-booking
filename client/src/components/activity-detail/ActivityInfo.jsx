import React from 'react';

const ActivityInfo = ({ activity }) => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-blue-800 mb-2 font-display">{activity.title}</h1>
                    <div className="flex items-center mb-2">
                        <div className="flex items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-lg font-medium">{activity.rating}</span>
                            <span className="ml-1 text-gray-600">({activity.reviewCount} reviews)</span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{activity.location}</span>
                    </div>
                </div>
                
                <div className="mt-4 md:mt-0 bg-blue-50 p-4 rounded-lg">
                    <div className="text-gray-700 mb-2">
                        <span className="font-medium">Duration:</span> {activity.duration} hour{activity.duration !== 1 ? 's' : ''}
                    </div>
                    <div className="text-gray-700">
                        <span className="font-medium">Type:</span> {activity.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityInfo;
