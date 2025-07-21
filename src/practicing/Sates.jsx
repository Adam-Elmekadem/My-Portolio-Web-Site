import React from 'react';

export default function States() {
    const [connécté, setConnécté] = React.useState(false);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold">{connécté ? "connected" : "disconnected"}</h1>
            <button onClick = {() => setConnécté(!connécté)} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                Toggle Connection
            </button>
        </div>
    );
}