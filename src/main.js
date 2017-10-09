/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';
import * as App from './app';
import babelpolyfill from 'babel-polyfill';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
import '@/assets/theme/theme-darkblue/index.css';
import 'font-awesome/css/font-awesome.min.css';
import locale from 'element-ui/lib/locale/lang/en';
import MockServices from '@/mockservices';
import vueLogger from 'vue-logger';

Vue.use(vueLogger, {
  prefix: () => new Date(),
  dev: true,
  shortname: true,
  levels: ['log', 'warn', 'debug', 'error', 'dir'],
});

Vue.use(ElementUI, { locale });

require('./bootstrap');

Vue.console.debug('MOCK_SERVICES: ' + process.env.MOCK_SERVICES);
const MOCK_SERVICES = process.env.MOCK_SERVICES || 'false';
Vue.console.debug('MOCK_SERVICES: ' + MOCK_SERVICES);
if (MOCK_SERVICES === 'true') {
  MockServices.bootstrap();
}

new Vue(App).$mount('#app');
