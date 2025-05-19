import React from 'react';

const ActivityCategories = () => {
    const categories = [
        {
            id: 1,
            title: "Surfing",
            icon: "🏄‍♂️",
            description: "Catch the perfect wave in crystal clear waters"
        },
        {
            id: 2,
            title: "Diving",
            icon: "🤿",
            description: "Explore vibrant coral reefs and underwater wonders"
        },
        {
            id: 3,
            title: "Snorkeling",
            icon: "🐠",
            description: "Swim alongside colorful marine life in shallow waters"
        }
    ];

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-700 font-display">Activity Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map(category => (
                    <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 text-center">
                            <span className="text-5xl">{category.icon}</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-blue-600">{category.title}</h3>
                            <p className="text-gray-600">{category.description}</p>
                            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 w-full">
                                Explore {category.title}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ActivityCategories;
