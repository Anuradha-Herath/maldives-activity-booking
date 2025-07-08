import React from 'react';
import ActivityListItem from './ActivityListItem';

const ActivityList = ({ activities }) => {
    // Handle undefined or null activities
    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-lg text-gray-600">No activities match your current filters.</p>
                <p className="mt-2 text-blue-600">Try adjusting your filters to see more results.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            {activities.map(activity => (
                <ActivityListItem key={activity._id || activity.id} activity={activity} />
            ))}
        </div>
    );
};

export default ActivityList;
