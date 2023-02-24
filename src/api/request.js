import request, { extend } from 'umi-request';
const errorHandler = (error) => {
  const { response } = error;
  return response;
};
const req = extend({
  errorHandler, // 默认错误处理
});
request.interceptors.request.use(async (url, options) => {
  if (
    options.method === 'post' ||
    options.method === 'put' ||
    options.method === 'delete' ||
    options.method === 'get'
  ) {
    let headers;
    if (url === 'http://192.168.1.237:8081/v2/registes') {
      headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        // Accept: 'multipart/form-data',
        Token: localStorage.getItem('token'),
      };
    }
    // if (url === 'http://192.168.1.237:8081/v2/uploadfile') {
    //   headers = {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     // Accept: 'multipart/form-data',
    //     Token: localStorage.getItem('token'),
    //   };
    // }
    return {
      url,
      // url: `http://116.236.41.244:9000${url}`,
      options: { ...options, headers },
    };
  }
});
export default req;
