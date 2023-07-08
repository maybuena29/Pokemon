module.exports = {
    content: ['./src/**/*.{jxs,js,ts,tsx}'],
    darkMode: 'class',
    theme: {
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
      },
      extend: {
        fontSize: {
          14: '14px',
        },
        backgroundColor: {
          'main-bg': '#F8F8F8',
          'main-dark-bg': '#20232A',
          'secondary-dark-bg': '#33373E',
          'light-gray': '#F7F7F7',
          'light-blue': '#56C2FF',
          'red': '#FF3C52',
          'half-transparent': 'rgba(0, 0, 0, 0.5)',
        },
        borderWidth: {
          1: '1px',
        },
        borderColor: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        width: {
          400: '400px',
          760: '760px',
          780: '780px',
          800: '800px',
          1000: '1000px',
          1200: '1200px',
          1400: '1400px',
        },
        height: {
          80: '80px',
        },
        minHeight: {
          590: '590px',
        },
      },
    },
    plugins: [],
  };