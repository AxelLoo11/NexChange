"use client";

import React, { useState } from 'react';
import FeedCard from './FeedCard';
import { PostInfo } from '@/models/postInfo';

interface TabSettings<T> {
    tabName: string;
    tabType: string;
    tabValue: T[]; // Generic array of items for the tab
}

interface TabGallaryProps<T> {
    tabs: TabSettings<T>[]; // Array of tabs with generic content
}

const TabGallary = <T,>({ tabs }: TabGallaryProps<T>) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <div className="w-full flex-auto overflow-auto">
            {/* Tabs */}
            <div className="flex w-full justify-center mb-4">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-auto px-4 py-2 ${activeTab === index ? 'bg-yellow-500 text-white' : 'hover:bg-gray-200 hover:text-yellow-500 text-yellow-700'} ${index === 0 ? 'rounded-l-md' : ''} ${index === tabs.length - 1 ? 'rounded-r-md' : ''}`}
                    >
                        {tab.tabName}
                    </button>
                ))}
            </div>

            {/* Content for the active tab */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tabs[activeTab].tabValue.length === 0 ? ( // Check if the tabValue array is empty
                    <div className="col-span-full text-center">Currently Null</div> // Display message if empty
                ) : (
                    tabs[activeTab].tabValue.map((item, index) => (
                        <div key={index}>
                            {/* Directly rendering the FeedCard for PostInfo */}
                            {tabs[activeTab].tabType === "Post" ? (
                                <FeedCard post={item as PostInfo} /> // Assuming item is of type PostInfo
                            ) : (
                                <div>No valid post information</div> // Handle cases if not a PostInfo
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TabGallary;
