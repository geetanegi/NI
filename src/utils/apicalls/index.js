import axios from 'axios';
import {getToken} from './tokenApi';

export const retrieveData = async () => {
  return getToken();
};

//test
export const getApi = async api => {
  const mytoken = await retrieveData();
  const config = {
    headers: {
      Authorization: 'Bearer ' + mytoken,
      'Content-Type': 'application/json',
    },
  };
  console.log({api, mytoken});
  return new Promise((resolve, reject) => {
    axios(api, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const postApi = async (api, data) => {
  console.log(api, data);
  const mytoken = await retrieveData();
  const config = {
    headers: {
      Authorization: 'Bearer ' + mytoken,
      'Content-Type': 'application/json',
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const uploadApi = async (api, data) => {
  const mytoken = await retrieveData();
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + mytoken,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const handleAuthorization = status => {
  console.log({status});
  if (status !== 401) {
    return;
  } else {
    // AsyncStorage.clear();
  }
};

export const tokenValidationHandle = async exp => {
  const currentDate = new Date();
  const tokenExpiryDate = new Date(exp);
  if (tokenExpiryDate > currentDate) {
    console.log('Token is still valid');
  } else {
    console.log('Token has expired');
    //await refreshToken();
  }
};
