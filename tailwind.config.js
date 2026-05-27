/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                cosmic: {
                    black: '#020308',
                    purple: '#25103d',
                    blue: '#13203f',
                    cyan: '#74f9ff',
                },
            },
        },
    },
    plugins: [],
} 