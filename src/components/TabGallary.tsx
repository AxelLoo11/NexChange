"use client";

import React, { useState } from 'react';
import { RefPost } from '@/models';
import RefPostCard from './refPostCard';

interface TabSettings {
    tabName: string;
    tabValue: RefPost[]; // Generic array of items for the tab
}

interface TabGallaryProps {
    tabs: TabSettings[]; // Array of tabs with generic content
}

const TabGallary = ({ tabs }: TabGallaryProps) => {
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
                            <RefPostCard post={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TabGallary;
