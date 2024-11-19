import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['--font-mulish', "sans-serif"],
        poppins:['var(--font-poppins)',"sans-serif"],
        k2d:['var(--font-k2d)',"sans-serif"],
        montserrat:['var(--font-montserrat)',"sans-serif"],
        nunito:['var(--font-nunito)',"sans-serif"]
        // Add more custom font families as needed
      },
      colors: {
        'footer-yellow': '#FCFAEE',
        'search-button-orange':'#EDB24E',
        'table-brown':'#FFE5B9',
        'table-line': '#F29A2E',
        'background-col': '#DDF2FF',
        'background-blue': '#296EB6',
        'background-filter': '#FCFAEE',
        'clicked_filter': '#DA8359',
        'hover_filter': '#ECDFCC',
        'title_filter': '#A5B68D',
        'form_bg': '#2C74B3',
        'form_content': '#FEEE91'
      }
    },
  },

  // plugins: [
  //   require('@tailwindcss/line-clamp'),

  // ],
};
export default config;
