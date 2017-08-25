import Vue from 'vue';

// Mock any GET request to /accounts
// arguments for reply are (status, data, headers)
Vue.$mockHttp.onGet('/accounts').reply(200, {
  accounts: [
    { id: 1, name: 'John Smith' },
  ],
});
