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

module.exports = withTM({
  swcMinify: true,
  trailingSlash: true,
  env: {
    ENV: process.env.ENV || 'development'
  }
});
