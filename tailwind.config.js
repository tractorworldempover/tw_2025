/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}" 
  ],
  theme: {
    extend: {
      fontFamily: { inter: "Inter" } ,
      colors: {
        primaryColor: '#F37021',
        secondaryColor: '#652178',
        grayColor:'#888888',
        bodyColor:"#F6F6F6",
        footer:"#000"

      },
      fontSize: {
        xs:'0.67rem',
        sm: '.8rem',
        medium:'.9rem',
        footerHeading:'0.73rem'
      },
      backgroundColor: {
         "yellow-800": '#DB710E',
         "blue-800" : '#4B49AC',
         "checkbox-color":"#edecf7"
      },
      screens: {
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl':'1440px',
      },
      boxShadow: {
        'custom-medium':'0px 6.82px 17.75px 8.87px #0000000D',
        'features-shadow':'0px 1.93px 9.63px 0px #00000026'

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}