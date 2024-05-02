import React from 'react';

const ComponentDescription = ({ componentName, description }) => {
    return (
        <div className="mb-8">
            <p className="text-lg font-bold mb-2 text-black">
                {componentName}
            </p>
            <p className="text-sm text-black">
                {description}
            </p>
        </div>
    );
};

export default ComponentDescription;
