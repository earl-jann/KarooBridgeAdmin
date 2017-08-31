import Mock from 'mockjs';

const Temp = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '',
    name: 'Mr Admin',
  },
];

const Listeners = [];

for (let i = 0; i < 86; i++) {
  Listeners.push(Mock.mock({
    // id: Mock.Random.guid(),
    // ip_address: Mock.Random.ip(),
    // default: Mock.Random.bool(),
    // external_address: Mock.Random.ip(),
    // tcp_enabled: Mock.Random.bool(),
    // udp_enabled: Mock.Random.bool(),
    // ws_enabled: Mock.Random.bool(),
    // tls_enabled: Mock.Random.bool(),
    // sip_port: Mock.Random.integer(10000, 30000),
    // tls_port: Mock.Random.integer(10000, 30000),
    // subnets: [Mock.Random.ip(), Mock.Random.ip(), Mock.Random.ip()],
    name: Mock.Random.guid(),
    description: Mock.Random.word(3, 5),
    ipAddress: Mock.Random.ip(),
    default: Mock.Random.integer(0, 1),
    externalAddress: Mock.Random.ip(),
    tcpEnabled: Mock.Random.integer(0, 1),
    udpEnabled: Mock.Random.integer(0, 1),
    wsEnabled: Mock.Random.integer(0, 1),
    tlsEnabled: Mock.Random.integer(0, 1),
    sipPort: Mock.Random.integer(10000, 30000),
    tlsPort: Mock.Random.integer(10000, 30000),
    subnets: [Mock.Random.ip(), Mock.Random.ip(), Mock.Random.ip()],
  }));
}

export { Temp, Listeners };
