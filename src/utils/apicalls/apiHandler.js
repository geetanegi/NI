import {setArchive} from '../../redux/reducers/Archive';
import {store} from '../../redux/store';
import {getToken} from './tokenApi';

export const getApiHeader = async needToken => {
  let mytoken;
  if (needToken) mytoken = await getToken();
  const config = {
    headers: {
      Authorization: 'Bearer ' + mytoken,
      'Content-Type': 'application/json',
    },
  };
  return config;
};

export const handleFailedResponse = (err, reject) => {
  //onsole.log('postApi res.status:catch', err.response?.data?.message);
  reject({
    status: err.response?.status,
    message: err.response?.data?.message,
  });
};

export const handleSuccessResponse = (res, resolve, reject) => {
  //console.log('postApi res.status', res.status);
  if (res.status === 200) {
    //console.log('postApi res.status:200', res.data);
    resolve(res.data?.data);
  } else {
    //console.log('postApi res.status:failed', res.data);
    reject({status: res.status, message: res.data?.message});
  }
};
