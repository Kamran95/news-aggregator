/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
    darkMode: '',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Domine', 'sans-serif'],
            },
            borderWidth: {
                1: '1px',
            },
            colors: {
                brand: '#2cb14b',
                secondary: '#F6F7F8',
                charcoal: '#333',
            },
            textColor: {
                brand: '#1B9988',
                'brand-light': '#007EC720',
            },
            width: {
                84: '21rem',
                98: '24.5rem',
            },
            padding: {
                22: '5.5rem',
            },
            fontSize: {
                '3xl': '2rem',
            },
            fontWeight: {
                'semi-light': 400,
            },
            boxShadow: {
                custom: '0px 1.5px 4px -1px rgba(0, 0, 0, 0.08)',
            },
            borderRadius: {
                custom: '1.25rem',
            },
        },
    },
    plugins: [],
};
