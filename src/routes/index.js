/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */


/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
    // element vue
  {
    path: '/login',
    component: require('@/pages/login/login.vue'),
    name: 'login.index',
    hidden: true,
    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },
  {
    path: '/home',
    component: require('@/pages/Home.vue'),
    name: 'Transport',
    iconClass: 'el-icon-setting',
    children: [
        { path: '/main', component: require('@/pages/Main.vue'), name: 'Main', hidden: true },
        { path: '/interface', component: require('@/pages/listener/listener.vue'), name: 'Interfaces' },
        { path: '/carp-ha-interface', component: require('@/pages/listener/carp_ha_interface.vue'), name: 'CARP HA Interface' },
        { path: '/tls', component: require('@/pages/listener/tls.vue'), name: 'TLS' },
        { path: '/autoban', component: require('@/pages/listener/autoban.vue'), name: 'Autoban' },
        { path: '/autoban-packet-rate-whitelist', component: require('@/pages/listener/autoban_packet_rate_whitelist.vue'), name: 'Packet Rate Whitelist' },
        { path: '/firewall-rules', component: require('@/pages/listener/firewall_rules.vue'), name: 'Firewall Rules' },
        { path: '/port-ranges', component: require('@/pages/listener/port_ranges.vue'), name: 'Port Ranges' },
    ],
    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },
  {
    path: '/home',
    component: require('@/pages/Home.vue'),
    name: 'User Agent',
    iconClass: 'el-icon-setting',
    children: [
        { path: '/user-agent', component: require('@/pages/user_agent/user_agent.vue'), name: 'User Agent' },
        { path: '/channel-limits', component: require('@/pages/user_agent/channel_limits.vue'), name: 'Channel Limits' },
        { path: '/domain-limits', component: require('@/pages/user_agent/domain_limits.vue'), name: 'Domain Limits' },
    ],
    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },
  {
    path: '/routing',
    component: require('@/pages/Home.vue'),
    name: 'Routing',
    iconClass: 'el-icon-setting',
    children: [
        { path: '/profiles', component: require('@/pages/routing/domains.vue'), name: 'Profiles' },
        { path: '/advanced', component: require('@/pages/routing/domains.vue'), name: 'Advanced Modules' },
    ],
    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },
  {
    path: '/home',
    component: require('@/pages/Home.vue'),
    name: 'Monitoring',
    iconClass: 'el-icon-setting',
    children: [
        { path: '/homer', component: require('@/pages/sipcapture/homer.vue'), name: 'Homer' },
        { path: '/voipmonitor', component: require('@/pages/sipcapture/voipmonitor.vue'), name: 'Voip Monitor' },
    ],
    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
  {
    path: '/*',
    redirect: '/home',
    hidden: true,
  },
];
