import React, { useState } from 'react';

// This is a simplified image gallery. In a real app, you'd use a library like react-image-gallery
const ActivityImageGallery = ({ activity }) => {
    // For simplicity, we're creating a mock gallery with the main image and 4 additional images
    const [mainImage, setMainImage] = useState(activity.image);
    
    // Generate some placeholder images based on the main image
    const images = [
        activity.image,
        `https://source.unsplash.com/random/800x600?maldives,${activity.type},1`,
        `https://source.unsplash.com/random/800x600?maldives,${activity.type},2`,
        `https://source.unsplash.com/random/800x600?maldives,${activity.type},3`,
        `https://source.unsplash.com/random/800x600?maldives,${activity.type},4`
    ];

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto">
                {/* Main Image */}
                <div className="h-96 md:h-[500px] overflow-hidden relative">
                    <img 
                        src={mainImage} 
                        alt={activity.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50"></div>
                </div>
                
                {/* Thumbnail strip */}
                <div className="bg-gray-800 p-2">
                    <div className="flex overflow-x-auto space-x-2 pb-2 hide-scrollbar">
                        {images.map((img, index) => (
                            <div 
                                key={index} 
                                className={`flex-none w-20 h-16 cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img 
                                    src={img} 
                                    alt={`${activity.title} view ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityImageGallery;
