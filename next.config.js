const withTM = require('next-transpile-modules')();
//     [
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/interaction',
//   '@fullcalendar/list',
//   '@fullcalendar/react',
//   '@fullcalendar/timegrid',
//   '@fullcalendar/timeline',
// ]

const env = process.env.ENV;
let host = 'https://dev-api.farmacianetzer.com';
if (env === 'production') {
  host = 'https://api.farmacianetzer.com'; // production host
}
module.exports = withTM({
  compress: true,
  swcMinify: true,
  trailingSlash: true,
  env: {
    ENV: process.env.ENV || 'development',
    API_HOST: host
  },
  experimental: {
    outputStandalone: true
  }
});
