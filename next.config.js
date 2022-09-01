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
let host = 'http://LoadBalancer-819446529.us-east-1.elb.amazonaws.com:3001';
if (env === 'production') {
  console.log('production host');
  host = 'http://LoadBalancer-819446529.us-east-1.elb.amazonaws.com:3001'; // production host
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
