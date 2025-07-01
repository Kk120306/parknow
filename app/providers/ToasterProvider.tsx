'use client'

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        <Toaster
            reverseOrder={false}
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    duration: 3000,
                    style: {
                        background: '#4caf50',
                        color: '#fff',
                    },
                },
                error: {
                    duration: 3000,
                    style: {
                        background: '#f44336',
                        color: '#fff',
                    },
                },
            }}
            containerStyle={{
                top: '80px',
            }}  
        />
    );
};

export default ToasterProvider;