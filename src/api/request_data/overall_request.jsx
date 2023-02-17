import request from '../request';
let host = 'http://192.168.1.237:8081';
// export const userLogin = (data) => {
//   return request.post('/v2/login', { data });
// };
export const urllogin = (data) => {
  return request.post(`${host}/v1/login`, {
    body: JSON.stringify({
      approve_addr: data.approve_addr,
      result: data.result,
      time_stamp: data.time_stamp,
      user_addr: data.user_addr,
      sig: data.sig,
    }),
  });
};

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

//创建子链1
export const establish1 = (data) => {
  return request.post(`${host}/v2/registes`, {
    body: JSON.stringify({
      name: data.name,
      symbol: data.symbol,
      user: data.user,
      icon_path: data.icon_path,
      officical_site: data.officical_site,
      alloc_and_stakes: JSON.stringify(data.alloc_and_stakes),
      alloc_len: data.alloc_len,
    }),
  });
};
//创建子链1
// export const establish1 = (data) => {
//   return request.post(`${host}/v2/registes`, { data });
// };
// 子链icon;
export const Subchainicon = (data) => {
  console.log(data);
  return request.post(`${host}/v2/uploadicon`, { data });
};
