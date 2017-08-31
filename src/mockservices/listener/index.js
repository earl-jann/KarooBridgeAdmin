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
      const { name } = config.params;
      const mockListeners = tempListeners.filter((listener) => {
        if (name && listener.name.indexOf(name) === -1) return false;
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
      const { page, name } = config.params;
      let mockListeners = tempListeners.filter((listener) => {
        if (name && listener.name.indexOf(name) === -1) return false;
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
      const { name } = config.params;
      tempListeners = tempListeners.filter(u => u.name !== name);
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
      let { names } = config.params;
      names = names.split(',');
      tempListeners = tempListeners.filter(u => !names.includes(u.name));
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
      const { name, description, ipAddress, externalAddress, tcpEnabled,
        udpEnabled, wsEnabled, tlsEnabled, sipPort, tlsPort, subnets } = config.params;
      tempListeners.some((u) => {
        if (u.name === name) {
          u.name = name;
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

    mock.onGet('/listener/add').reply((config) => {
      const { name, description, ipAddress, externalAddress, tcpEnabled,
        udpEnabled, wsEnabled, tlsEnabled, sipPort, tlsPort, subnets } = config.params;

      tempListeners.push({
        name,
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
