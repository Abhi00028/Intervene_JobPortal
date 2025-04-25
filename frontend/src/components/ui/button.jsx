import React from 'react';

export const Button = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
    >
        {children}
    </button>
);
