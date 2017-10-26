import Vue from 'vue';
// import account from './account';
import listener from './listener';
// import user from './user';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    // account.bootstrap();
    listener.bootstrap();
    // user.bootstrap();
  },
};
