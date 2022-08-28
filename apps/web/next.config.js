const withTM = require("next-transpile-modules")(["ui", "logic"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  i18n: {
    locales: ['uk', 'ru'],
    defaultLocale: 'uk',
  }
});