import React from "react";
import { ArrowLeftIcon, CheckIcon, CameraIcon, VideoIcon } from 'lucide-react';

interface PriceListProps {
    onBack?: () => void;
}

const PriceList: React.FC<PriceListProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                {onBack && (
                    <div className="mb-8">
                        <button 
                            onClick={onBack}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Portfolio
                        </button>
                    </div>
                )}
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Photography Packages
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Professional photography services tailored to capture your most precious moments
                    </p>
                </div>

                {/* Engagement Packages */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-4">
                            <CameraIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                                Engagement Packages
                            </h2>
                        </div>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Engagement Full Package
                            </h3>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">8 Hour Coverage</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">200 High Resolution Edited Images</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">8x20 Magazine Album</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">One 16x24 Enlargement</span>
                                </li>
                            </ul>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    Rs. 85,000/-
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Engagement Digital Package
                            </h3>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">6 Hour Coverage</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">200 High Resolution Edited Images</span>
                                </li>
                            </ul>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    Rs. 50,000/-
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wedding Packages */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Wedding Packages
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Wedding Package I",
                                subtitle: "Wedding Digital Package",
                                features: [
                                    "10 hour exclusive coverage with two photographers",
                                    "Up to 300 edited high resolution images",
                                    "All unedited pictures on Drive"
                                ],
                                price: "Rs. 95,000/-",
                                popular: false
                            },
                            {
                                title: "Wedding Package II",
                                subtitle: "Wedding Full Package",
                                features: [
                                    "10 hour exclusive coverage with two photographers",
                                    "Up to 350 edited high resolution images",
                                    "12x30 fine art magazine album",
                                    "Two 20x30 enlargements",
                                    "All unedited pictures on Drive"
                                ],
                                price: "Rs. 160,000/-",
                                popular: true
                            },
                            {
                                title: "Wedding Package III",
                                subtitle: "Wedding + Homecoming Full Pack",
                                features: [
                                    "2 Days Coverage",
                                    "12x30 Album",
                                    "8x20 Family Album",
                                    "2 Enlargements 20x30",
                                    "2 Enlargements 16x24",
                                    "All Soft Copies on Pen Drive"
                                ],
                                price: "Rs. 240,000/-",
                                popular: false
                            }
                        ].map((pkg, index) => (
                            <div
                                key={index}
                                className={`relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${
                                    pkg.popular 
                                        ? 'border-blue-500 dark:border-blue-400' 
                                        : 'border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {pkg.title}
                                </h3>
                                <h4 className="text-lg text-blue-600 dark:text-blue-400 mb-6 font-medium">
                                    {pkg.subtitle}
                                </h4>
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {pkg.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pre-Casual Session */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Pre Casual Session
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Pre-Casual Package
                            </h3>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">2 outfits</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300">3 hour exclusive coverage on selected locations</span>
                                </li>
                            </ul>
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    Rs. 35,000/-
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-medium">Add-on:</span> Extra outfit - Rs. 12,000/-
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Add-ons */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Add-ons
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "Photobooth", price: "Rs. 40,000/-" },
                            { name: "4x6 thank you card (100)", price: "Rs. 10,000/-" },
                            { name: "6x8 thank you card (100)", price: "Rs. 15,000/-" },
                            { name: "12x18 enlargement", price: "Rs. 8,000/-" },
                            { name: "16x24 enlargement", price: "Rs. 10,000/-" },
                            { name: "20x30 enlargement", price: "Rs. 14,000/-" },
                            { name: "Extra Photographer", price: "Rs. 20,000/-" },
                            { name: "8x20 fine art magazine album", price: "Rs. 30,000/-" },
                            { name: "8x24 fine art magazine album", price: "Rs. 33,000/-" },
                            { name: "12x30 fine art magazine album", price: "Rs. 40,000/-" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                            >
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </span>
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {item.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Videography */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-4">
                            <VideoIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                                Wedding Videography
                            </h2>
                        </div>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Full HD Package</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-700 dark:text-gray-300">Pre casual video session</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 30,000/-</span>
                                </li>
                                <li className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-700 dark:text-gray-300">Wedding highlight video (one cam) with Trailer</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 40,000/-</span>
                                </li>
                                <li className="flex justify-between items-center py-2">
                                    <span className="text-gray-700 dark:text-gray-300">Wedding full video (two cam) with Trailer</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 70,000/-</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">4K Package</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-700 dark:text-gray-300">Pre casual video session</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 40,000/-</span>
                                </li>
                                <li className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-700 dark:text-gray-300">Wedding highlight video (one cam) with Trailer</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 55,000/-</span>
                                </li>
                                <li className="flex justify-between items-center py-2">
                                    <span className="text-gray-700 dark:text-gray-300">Wedding full video (two cam) with Trailer</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Rs. 85,000/-</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Videography Add-ons</h3>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="font-medium text-gray-900 dark:text-white">Drone footage with permission</span>
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Rs. 25,000/-</span>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="font-medium text-gray-900 dark:text-white">Extra videographer</span>
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Rs. 20,000/-</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-blue-600 dark:bg-blue-700 rounded-lg p-12 text-white">
                    <h3 className="text-3xl font-bold mb-4">Ready to capture your special moments?</h3>
                    <p className="text-xl mb-8 opacity-90">Contact us to discuss your photography needs and customize your perfect package.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="#contact" 
                            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            Book a Consultation
                        </a>
                        <a 
                            href="tel:+94755996155" 
                            className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-0.5"
                        >
                            Call Now
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PriceList;