/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './src/**/*.{js,ts}'],
    theme: {
        container: {
            padding: {
                DEFAULT: '15px',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1200px',
        },
        extend: {
            fontFamily: {
                primary: 'Jost, sans-serif',
            },
            colors: {
                primary: {
                    dark: '#111',
                    navy: '#2355d6',
                },
                neutral: {
                    dark: '#111',
                    mediumDark: '#555',
                    medium: '#999',
                    lightMedium: '#ddd',
                    light: '#fff',
                },
                tone: {
                    red: {
                        DEFAULT: '#ed0006',
                    },
                    yellow: {
                        DEFAULT: '#ffd75e',
                    },
                    green: {
                        DEFAULT: '#3ab446',
                    },
                },
                shadesOfGray: {
                    100: '#eee',
                    200: '#f9f9f9',
                },
            },
        },
    },
    plugins: [],
};
