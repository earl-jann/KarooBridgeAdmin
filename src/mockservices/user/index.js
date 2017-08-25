import axios from 'axios';
import Vue from 'vue';
import { LoginUsers, Users } from '../data/user';

let tempUsers = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    const mock = Vue.$mockHttp;

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success',
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    });

    mock.onPost('/login').reply((config) => {
      const { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          const hasUser = LoginUsers.some((u) => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
            return false;
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: 'Request Successful', user }]);
          } else {
            resolve([200, { code: 500, msg: 'Request Failed' }]);
          }
        }, 1000);
      });
    });

    mock.onGet('/user/list').reply((config) => {
      const { name } = config.params;
      const mockUsers = tempUsers.filter((user) => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers,
          }]);
        }, 1000);
      });
    });

    mock.onGet('/user/listpage').reply((config) => {
      const { page, name } = config.params;
      let mockUsers = tempUsers.filter((user) => {
        if (name && user.name.indexOf(name) === -1) return false;
        return true;
      });
      const total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total,
            users: mockUsers,
          }]);
        }, 1000);
      });
    });

    mock.onGet('/user/remove').reply((config) => {
      const { id } = config.params;
      tempUsers = tempUsers.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });

    mock.onGet('/user/batchremove').reply((config) => {
      let { ids } = config.params;
      ids = ids.split(',');
      tempUsers = tempUsers.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: 'Success',
          }]);
        }, 500);
      });
    });

    mock.onGet('/user/edit').reply((config) => {
      const { id, name, addr, age, birth, sex } = config.params;
      tempUsers.some((u) => {
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

    mock.onGet('/user/add').reply((config) => {
      const { name, addr, age, birth, sex } = config.params;
      tempUsers.push({ name, addr, age, birth, sex });

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
