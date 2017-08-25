// import find from './find';

// export default {
//   find,
// };
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Vue from 'vue';
import { Listeners } from '../data/listener';

let tempListeners = Listeners;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    // const mock = Vue.$mockHttp;
    const mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success',
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    });

    mock.onGet('/listener/list').reply((config) => {
      const { ipAddress } = config.params;
      const mockListeners = tempListeners.filter((listener) => {
        if (ipAddress && listener.ipAddress.indexOf(ipAddress) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            listeners: mockListeners,
          }]);
        }, 1000);
      });
    });

    mock.onGet('/listener/listpage').reply((config) => {
      const { page, ipAddress } = config.params;
      let mockListeners = tempListeners.filter((listener) => {
        if (ipAddress && listener.ipAddress.indexOf(ipAddress) === -1) return false;
        return true;
      });
      const total = mockListeners.length;
      mockListeners = mockListeners.filter((u, index) =>
        index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total,
            listeners: mockListeners,
          }]);
        }, 1000);
      });
    });

    mock.onGet('/listener/remove').reply((config) => {
      const { id } = config.params;
      tempListeners = tempListeners.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });

    mock.onGet('/listener/batchremove').reply((config) => {
      let { ids } = config.params;
      ids = ids.split(',');
      tempListeners = tempListeners.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });

    mock.onGet('/listener/edit').reply((config) => {
      const { id, name, addr, age, birth, sex } = config.params;
      tempListeners.some((u) => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
        return false;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });

    mock.onGet('/listener/add').reply((config) => {
      const { name, addr, age, birth, sex } = config.params;
      tempListeners.push({ name, addr, age, birth, sex });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });
  },
};
