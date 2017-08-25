/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';
import * as App from './app';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import MockServices from '@/mockservices';

Vue.use(ElementUI, { locale });

require('./bootstrap');

// if (process.env.MOCK_SERVICES === 'true') {
MockServices.bootstrap();
// }

new Vue(App).$mount('#app');
