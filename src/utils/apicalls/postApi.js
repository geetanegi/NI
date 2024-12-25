import axios from 'axios';
import {
  getApiHeader,
  handleFailedResponse,
  handleSuccessResponse,
} from './apiHandler';

export const postAuth = (url, data) => post(url, data, true);
export const postNoAuth = (url, data) => post(url, data, false);

const post = async (url, data, needToken = true) => {
  console.log('post api', url);
  const config = await getApiHeader(needToken);
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then(res => {
        //console.log('post api', url, 'then', res)
        handleSuccessResponse(res, resolve, reject);
      })
      .catch(err => {
        //console.log('post api', url, 'catch', err)
        handleFailedResponse(err, reject);
      });
  });
};
