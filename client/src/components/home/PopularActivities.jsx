import React from 'react';

const PopularActivities = () => {
    const activities = [
        {
            id: 1,
            title: "Sunset Dolphin Cruise",
            image: "https://images.unsplash.com/photo-1564329494258-55936fbe4b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Experience the magic of dolphins swimming alongside your boat as the sun sets.",
            price: 89
        },
        {
            id: 2,
            title: "Scuba Diving Adventure",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Dive into the crystal clear waters and discover vibrant coral reefs.",
            price: 149
        },
        {
            id: 3,
            title: "Luxury Island Hopping",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Visit multiple stunning islands in one day with a private boat.",
            price: 199
        },
        {
            id: 4,
            title: "Underwater Sea Walking",
            image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Walk on the ocean floor with specialized breathing equipment. No diving experience needed!",
            price: 129
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-700 font-display">Popular Activities</h2>
                <div className="flex overflow-x-auto pb-6 space-x-6 hide-scrollbar">
                    {activities.map(activity => (
                        <div key={activity.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="relative h-48">
                                <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full font-bold">
                                    ${activity.price}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-blue-700 mb-2">{activity.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300">
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

export default PopularActivities;
