import Vue from 'vue';

// Mock any GET request to /listeners
// arguments for reply are (status, data, headers)
Vue.$mockHttp.onGet('/listeners').reply(200, {
  listeners: [
    { id: 1, name: 'John Smith' },
  ],
});
