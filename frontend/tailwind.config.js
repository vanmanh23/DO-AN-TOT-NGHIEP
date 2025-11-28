/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2e353c',
        'secondary': '#919191',
        'primary-text': '#f0f0f0',
        'secondary-text': '#2e353c',
        'test-cl': "#2786ff",
        'menu-items': "#333333",
        'secondary-color': "#2d343b",
        'bg-secondary': "#6366FB",
      },
      boxShadow: {
        'right': '1px 0 2px rgba(0,0,0,0.1)',
      },
       keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
}

