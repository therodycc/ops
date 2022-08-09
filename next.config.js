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
    ENV: process.env.ENV || 'development',
    API_HOST:
      process.env.API_HOST || 'http://LoadBalancer-280640118.us-east-1.elb.amazonaws.com:3001'
  },
  experimental: {
    outputStandalone: true
  }
});
