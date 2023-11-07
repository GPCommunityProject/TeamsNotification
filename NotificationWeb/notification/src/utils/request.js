/**
 * 网络请求配置
 */
import axios from "axios";
import { message } from 'antd';

axios.defaults.timeout = 100000;
// axios.defaults.baseURL = "https://service-ncrmvah7-1259274347.sh.apigw.tencentcs.com/release";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
      }).then((response) => {
        landing(url, params, response && response.data ? response.data : response);
        resolve(response && response.data ? response.data : response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data, options = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, options).then(
      (response) => {
        //关闭进度条
        resolve(response && response.data ? response.data : response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response && response.data ? response.data : response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
        params: params,
      }).then((response) => {
        landing(url, params, response && response.data ? response.data : response);
        resolve(response && response.data ? response.data : response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response && response.data ? response.data : response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function (fecth, url, param, options = {}) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        
        post(url, param, options)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      case "delete":
        del(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request DELETE failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err) {
  if (err && err.response) {
    let msg = '';
    switch (err.response.status) {
      case 400:
        msg =  err.response.data && err.response.data.error ? err.response.data.error.details : '请求失败';
        break;
      case 401:
        msg = "未授权，请登录";
        break;

      case 403:
        msg = "拒绝访问";
        break;

      case 404:
        msg = "请求地址出错";
        break;

      case 408:
        msg = "请求超时";
        break;

      case 500:
        msg = "服务器内部错误";
        break;

      case 501:
        msg = "服务未实现";
        break;

      case 502:
        msg = "网关错误";
        break;

      case 503:
        msg = "服务不可用";
        break;

      case 504:
        msg = "网关超时";
        break;

      case 505:
        msg = "HTTP版本不受支持";
        break;
      default:
    }
    if (msg) {
      message.error({
        content: msg
      });
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data && data.code === -1) {
  }
}