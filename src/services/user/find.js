import userTransformer from './../../transformers/user';
import store from './../../store';
import Vue from 'vue';

// When the request succeeds
const success = (user) => {
  user = userTransformer.fetch(user);

  store.dispatch('user/store', user);
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
   * Vue.$http.get('/user')
   *   .then((response) => {
   *     success(response);
   *   })
   *   .catch((error) => {
   *     failed(error);
   *   });
   */

  Vue.$http.get('/user')
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
