const path = require('path');
const { i18n } = require('./next-i18next.config');

 module.exports = {
  reactStrictMode: true,   
  i18n,
  webpack: (config) => {
   // config.resolve.alias['@locales'] = path.join(__dirname, 'public','locales');
    config.resolve.alias['@Images'] = path.join(__dirname, 'public', 'images');
    config.resolve.alias['@components'] = path.join(__dirname, 'components');
    config.resolve.alias['@service'] = path.join(__dirname, 'lib');
    config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['@helpers'] = path.join(__dirname, 'helpers');
    config.resolve.alias['@store']=path.join(__dirname,'store','slices');
    config.resolve.fallback = { fs: false };
    return config; 
  }, 
  images: 
  {
    domains: ['tractorworld.empover.com',
              'usedtractorstorage.blob.core.windows.net',
              'castagingstorage.blob.core.windows.net']
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com; script-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};


