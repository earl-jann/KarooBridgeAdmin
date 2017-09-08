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
  // Home
  // {
  //   path: '/home',
  //   name: 'home.index',
  //   component: require('@/pages/home/index.vue'),

  //   // If the user needs to be authenticated to view this page
  //   meta: {
  //     auth: true,
  //   },
  // },

  // // Account
  // {
  //   path: '/account',
  //   name: 'account.index',
  //   component: require('@/pages/account/index.vue'),

  //   // If the user needs to be authenticated to view this page
  //   meta: {
  //     auth: true,
  //   },
  // },

  // // Listener
  // {
  //   path: '/listener',
  //   name: 'listener.index',
  //   component: require('@/pages/listener/index.vue'),
  //   // If the user needs to be authenticated to view this page
  //   meta: {
  //     auth: true,
  //   },
  // },
  // {
  //   path: '/listeners/create',
  //   name: 'listener.create',
  //   component: require('@/pages/listener/create.vue'),
  //   meta: {
  //     auth: true,
  //   },
  // },
  // {
  //   path: '/listeners/edit/:id',
  //   name: 'listener.edit',
  //   component: require('@/pages/listener/edit.vue'),
  //   meta: {
  //     auth: true,
  //   },
  // },
  // {
  //   path: '/listeners/delete/:id',
  //   name: 'listener.delete',
  //   component: require('@/pages/listener/delete.vue'),
  //   meta: {
  //     auth: true,
  //   },
  // },

  // // Login
  // {
  //   path: '/login',
  //   name: 'login.index',
  //   component: require('@/pages/login/index.vue'),

  //   // If the user needs to be a guest to view this page
  //   meta: {
  //     guest: true,
  //   },
  // },

  // // Register
  // {
  //   path: '/register',
  //   name: 'register.index',
  //   component: require('@/pages/register/index.vue'),

  //   // If the user needs to be a guest to view this page
  //   meta: {
  //     guest: true,
  //   },
  // },

    // element vue
  {
    path: '/home',
    component: require('@/pages/Home.vue'),
    name: 'Listener',
    iconCls: 'el-icon-setting',
    children: [
        { path: '/main', component: require('@/pages/Main.vue'), name: 'Main', hidden: true },
        { path: '/interface', component: require('@/pages/listener/listener.vue'), name: 'Interfaces' },
        { path: '/default-interface', component: require('@/pages/listener/default_interface.vue'), name: 'Default Interface' },
        { path: '/carp-ha-interface', component: require('@/pages/listener/carp_ha_interface.vue'), name: 'CARP HA Interface' },
        { path: '/tls', component: require('@/pages/listener/tls.vue'), name: 'TLS' },
        { path: '/autoban', component: require('@/pages/listener/autoban.vue'), name: 'Autoban' },
        { path: '/port-ranges', component: require('@/pages/listener/port_ranges.vue'), name: 'Port Ranges' },
    ],
  },
  {
    path: '/home',
    component: require('@/pages/Home.vue'),
    name: 'User Agent',
    iconCls: 'el-icon-setting',
    children: [
        { path: '/user-agent', component: require('@/pages/user_agent/user_agent.vue'), name: 'User Agent' },
        { path: '/channel-limits', component: require('@/pages/user_agent/channel_limits.vue'), name: 'Channel Limits' },
    ],
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
