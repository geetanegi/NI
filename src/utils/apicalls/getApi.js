import axios from 'axios';
import {
  getApiHeader,
  handleFailedResponse,
  handleSuccessResponse,
} from './apiHandler';

export const getAuth = url => get(url, true);
export const getNoAuth = url => get(url, false);

const get = async (url, needToken = true) => {
  const config = await getApiHeader(needToken);
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(res => {
        handleSuccessResponse(res, resolve, reject);
      })
      .catch(err => {
        handleFailedResponse(err, reject);
      });
  });
};
