import axios from 'axios';
import {
  getApiHeader,
  handleFailedResponse,
  handleSuccessResponse,
} from './apiHandler';

export const deleteAuth = (url) => deleteApi(url, true);

const deleteApi = async (url, needToken = true) => {
  console.log('delete api', url);
  const config = await getApiHeader(needToken);
  return new Promise((resolve, reject) => {
    axios
      .delete(url, config)
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
