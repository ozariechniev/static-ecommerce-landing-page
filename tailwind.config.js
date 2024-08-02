/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './src/**/*.{js,ts}'],
    theme: {
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
                    100: '#fefefe',
                    200: '#ddd',
                },
            },
        },
    },
    plugins: [],
};
