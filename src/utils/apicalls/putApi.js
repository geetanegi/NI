import axios from 'axios';
import {
  getApiHeader,
  handleFailedResponse,
  handleSuccessResponse,
} from './apiHandler';

export const putAuth = (url, data) => put(url, data, true);
export const putNoAuth = (url, data) => put(url, data, false);

const put = async (url, data, needToken = true) => {
  const config = await getApiHeader(needToken);
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config)
      .then(res => {
        handleSuccessResponse(res, resolve, reject);
      })
      .catch(err => {
        handleFailedResponse(err, reject);
      });
  });
};
