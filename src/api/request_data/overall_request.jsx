import request from '../request';
let host = 'http://192.168.1.237:8081';
//账户余额查询
export const adsBalance = (data) => {
  return request.get(`${host}/v2/balance`, {
    params: {
      addr: data,
    },
  });
};
//热门子链查询
export const Popularsubchain = (data) => {
  return request.get(`${host}/v2/getinfo`, {
    params: {
      page: data.page,
      flag: data.flag,
      order: data.order,
      user: data.user,
      status: data.status,
    },
  });
};
