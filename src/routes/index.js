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
        { path: '/ha-interface', component: require('@/pages/listener/carp_ha_interface.vue'), name: 'High Availability Interface' },
        { path: '/tls', component: require('@/pages/listener/tls.vue'), name: 'TLS' },
        { path: '/packet-rate-limits', component: require('@/pages/listener/packet_rate_limits.vue'), name: 'Packet Rate Limits' },
        { path: '/firewall-rules', component: require('@/pages/listener/firewall_rules.vue'), name: 'Firewall Rules' },
        { path: '/port-ranges', component: require('@/pages/listener/port_ranges.vue'), name: 'Port Ranges' },
        { path: '/rtp-proxy', component: require('@/pages/listener/rtp_proxy.vue'), name: 'RTP Proxy' },
    ],
    /*
        { path: '/autoban',
          component: require('@/pages/listener/autoban.vue'),
          name: 'Packet Rate Limits' },
        { path: '/autoban-packet-rate-whitelist',
          component: require('@/pages/listener/autoban_packet_rate_whitelist.vue'),
          name: 'Packet Rate Whitelist' },
    */
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
        { path: '/call-limits', component: require('@/pages/user_agent/channel_limits.vue'), name: 'Call Limits' },
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
      { path: '/domain-profiles', component: require('@/pages/routing/domain_profiles.vue'), name: 'Domains' },
      { path: '/dp-scripts/:id', component: require('@/pages/routing/domain_profiles_scripts.vue'), name: 'Domain Profile Scripts', hidden: true },
      { path: '/gateway-profiles', component: require('@/pages/routing/gateway_profiles.vue'), name: 'Gateways' },
      { path: '/gp-scripts/:id', component: require('@/pages/routing/gateway_profiles_scripts.vue'), name: 'Gateway Profile Scripts', hidden: true },
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
