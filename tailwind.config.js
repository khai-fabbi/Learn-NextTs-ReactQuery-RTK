/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      print: { raw: 'print' },
      xs: '320px',
      sp: '375px',
      '2sp': '414px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      '2lg': '1150px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1750px',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        primary: ['Noto Sans JP', 'sans-serif'],
      },
      colors: {
        default: '#202223',
        primary: '#570DF8',
        secondary: '#F000B8',
        gray: {
          1: '#F5F5F5',
          2: '#c4c4c4',
          4: '#c4c4c4',
          6: '#aaaaaa',
          7: '#6d7175',
          8: '#666666',
        },
        black: {
          origin: '#000',
          text1: '#212B36',
          activate: '#0B1D29',
        },
        green: {
          primary: '#00C07B',
          10: '00CB82',
        },
        red: {
          primary: '#F10E00',
          10: '#FF3636',
        },
      },
      boxShadow: {
        sdprimary: '10px 10px 20px rgba(211, 211, 211, 0.25)',
      },
      animation: {
        fade: 'fade 0.5s ease-in-out',
        flip: 'flip 1.2s ease-in-out infinite',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#570DF8',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#3D4451',

          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F10E00',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
