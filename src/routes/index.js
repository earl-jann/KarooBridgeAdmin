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
    name: 'Home',
    iconCls: 'el-icon-message',
    children: [
        { path: '/main', component: require('@/pages/Main.vue'), name: 'Main', hidden: true },
        { path: '/table', component: require('@/pages/listener/listener.vue'), name: 'Listeners' },
        // { path: '/form', component: Form, name: 'Form' },
        // { path: '/user', component: user, name: 'User' },
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
