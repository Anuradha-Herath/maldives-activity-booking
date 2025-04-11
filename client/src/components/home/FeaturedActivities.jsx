import React from 'react';

const FeaturedActivities = () => {
    const activities = [
        {
            id: 1,
            title: "Scuba Diving",
            description: "Explore the vibrant underwater world of the Maldives.",
            price: 149
        },
        {
            id: 2,
            title: "Sunset Cruise",
            description: "Enjoy the magical sunset views from a luxury boat.",
            price: 99
        },
        {
            id: 3,
            title: "Island Hopping",
            description: "Visit multiple islands in one exciting day trip.",
            price: 129
        }
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary font-display">Featured Activities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map(activity => (
                        <div key={activity.id} className="activity-card shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold mb-2 text-secondary">{activity.title}</h3>
                            <p className="mb-4 text-text">{activity.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-secondary">${activity.price}</span>
                                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedActivities;