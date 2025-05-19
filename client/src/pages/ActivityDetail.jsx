import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActivityImageGallery from '../components/activity-detail/ActivityImageGallery';
import ActivityInfo from '../components/activity-detail/ActivityInfo';
import ActivityTabs from '../components/activity-detail/ActivityTabs';
import BookingForm from '../components/activity-detail/BookingForm';
import RelatedActivities from '../components/activity-detail/RelatedActivities';
import { activitiesData } from '../data/activitiesData';

const ActivityDetail = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedActivities, setRelatedActivities] = useState([]);

    useEffect(() => {
        // In a real app, this would be an API call
        const fetchActivity = () => {
            setLoading(true);
            setTimeout(() => {
                // Find the activity with the matching ID
                const foundActivity = activitiesData.find(act => act.id.toString() === id);
                
                if (foundActivity) {
                    setActivity(foundActivity);
                    
                    // Find related activities (same type or location)
                    const related = activitiesData
                        .filter(act => 
                            act.id !== foundActivity.id && 
                            (act.type === foundActivity.type || act.location === foundActivity.location)
                        )
                        .slice(0, 4); // Limit to 4 related activities
                    
                    setRelatedActivities(related);
                }
                
                setLoading(false);
            }, 500);
        };

        if (id) {
            fetchActivity();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h2 className="text-xl font-bold mb-2">Activity Not Found</h2>
                    <p>Sorry, we couldn't find the activity you're looking for.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Image Gallery */}
            <ActivityImageGallery activity={activity} />
            
            <div className="container mx-auto px-4 py-8">
                {/* Activity Info (Title, Rating, Location) */}
                <ActivityInfo activity={activity} />
                
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details Tabs */}
                    <div className="lg:col-span-2">
                        <ActivityTabs activity={activity} />
                    </div>
                    
                    {/* Right Column - Booking Form */}
                    <div>
                        <BookingForm activity={activity} />
                    </div>
                </div>
                
                {/* Related Activities */}
                <div className="mt-16">
                    <RelatedActivities activities={relatedActivities} />
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
