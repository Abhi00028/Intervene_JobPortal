import React from 'react';

export const Card = ({ children }) => (
    <div className="border rounded-lg shadow-md p-4 bg-white">{children}</div>
);

export const CardHeader = ({ title }) => (
    <h2 className="text-xl font-bold mb-2">{title}</h2>
);

export const CardContent = ({ children }) => (
    <div className="text-gray-700">{children}</div>
);

export const CardTitle = ({ title }) => (
    <h3 className="text-lg font-semibold">{title}</h3>
);
