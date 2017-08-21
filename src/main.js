/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';
import * as App from './app';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';

// Vue.use(ElementUI);

require('./bootstrap');

new Vue(App).$mount('#app');
