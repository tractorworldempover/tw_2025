module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'mr'], // Add all your supported locales
  },
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/locales',
}; 