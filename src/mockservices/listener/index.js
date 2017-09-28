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

    mock.onGet('/interfaces').reply((config) => {
      const { id } = config.params;
      const mockListeners = tempListeners.filter((listener) => {
        if (id && listener.id.indexOf(id) === -1) return false;
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

    // mock.onGet('/interfaces').reply((config) => {
    //   const { page, id } = config.params;
    //   let mockListeners = tempListeners.filter((listener) => {
    //     if (id && listener.id.indexOf(id) === -1) return false;
    //     return true;
    //   });
    //   const total = mockListeners.length;
    //   mockListeners = mockListeners.filter((u, index) =>
    //     index < 20 * page && index >= 20 * (page - 1));
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         total,
    //         listeners: mockListeners,
    //       }]);
    //     }, 1000);
    //   });
    // });

    // the actual id can be grabbed from config.url
    mock.onDelete(/\/interfaces\/\d+/).reply((config) => {
      const { id } = config.url;
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

    mock.onPut(/\/interfaces\/\d+/).reply((config) => {
      const mainId = config.url;
      // Vue.$console.log(mainId);
      Vue.console.debug('mockservices.listener.config: ' + config);
      Vue.console.debug('mockservices.listener.config.data: ' + config.data);
      if (config.url) {
        Vue.console.debug('mockservices.listener.config.url: ' + mainId);
      }
      const { id, description, ipAddress, externalAddress, tcpEnabled,
        udpEnabled, wsEnabled, tlsEnabled, sipPort, tlsPort, subnets } = config.data;
      tempListeners.some((u) => {
        if (u.id === id) {
          u.id = id;
          u.description = description;
          u.ipAddress = ipAddress;
          u.externalAddress = externalAddress;
          u.tcpEnabled = tcpEnabled;
          u.udpEnabled = udpEnabled;
          u.wsEnabled = wsEnabled;
          u.tlsEnabled = tlsEnabled;
          u.sipPort = sipPort;
          u.tlsPort = tlsPort;
          u.subnets = subnets;
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

    mock.onPost('/interfaces').reply((config) => {
      const { id, description, ipAddress, externalAddress, tcpEnabled,
        udpEnabled, wsEnabled, tlsEnabled, sipPort, tlsPort, subnets } = config.params;

      tempListeners.push({
        id,
        description,
        ipAddress,
        externalAddress,
        tcpEnabled,
        udpEnabled,
        wsEnabled,
        tlsEnabled,
        sipPort,
        tlsPort,
        subnets,
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
  },
};
