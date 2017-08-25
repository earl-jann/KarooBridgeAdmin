import accountTransformer from './../../transformers/account';
import store from './../../store';
import Vue from 'vue';

// When the request succeeds
const success = (account) => {
  account = accountTransformer.fetch(account);

  store.dispatch('account/store', account);
};

// When the request fails
const failed = () => {
};

export default () => {
  /*
   * Normally you would perform an AJAX-request.
   * But to get the example working, the data is hardcoded.
   *
   * With the include REST-client Axios, you can do something like this:
   * Vue.$http.get('/account')
   *   .then((response) => {
   *     success(response);
   *   })
   *   .catch((error) => {
   *     failed(error);
   *   });
   */

  Vue.$http.get('/account')
    .then((response) => {
      success(response);
    })
    .catch((error) => {
      failed(error);
    });
};

//   const succeeds = false;
//   if (succeeds) {
//     success({
//       first_name: 'John',
//       last_name: 'Doe',
//       email: 'john@doe.com',
//     });
//   } else {
//     failed();
//   }
// };
