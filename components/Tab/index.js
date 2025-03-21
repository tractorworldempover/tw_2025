import React from 'react';

const Tab = ({ id, activeTab, onClick, children, image = false }) => {
    return (
        <div
            className={`${(activeTab === id && !image) ? 'text-secondaryColor border-b-2 border-secondaryColor  ' : 'text-[#00000080]'} sm:text-[15px] text-[9.6px] cursor-pointer`}
            onClick={() => onClick(id)}
        >
            {children}
        </div>
    );
};

export default Tab;
