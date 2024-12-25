import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../endpoints';
import {sleep} from '../helperfunctions/functions';
import {postNoAuth} from './postApi';
import {environment} from '../constant';
import {isUserLoggedIn} from '../../redux/store/getState';
import NetInfo from '@react-native-community/netinfo';
import {getAuth} from './getApi';
const isRefreshingToken = 'isRefreshingToken';
 
export const storeTokenData = async tokenData => {
  try {
    //console.log('storeTokenData tokenData', tokenData);
    await AsyncStorage.setItem('token', JSON.stringify(tokenData));
  } catch (e) {
    console.error('Error storing token:', e);
  }
};
 
export const getTokenData = async () => {
  const tokenData = await AsyncStorage.getItem('token');
  // console.log({tokenData});
  return JSON.parse(tokenData);
};
 
export const getToken = async (retry = 0) => {
  try {
    const data = await getTokenData();
 
    const accessTokenExpiry = new Date(data?.accessTokenExpiry);
    const currentDate = new Date();
    const checkExpirtyDateTime = new Date(
      currentDate.getTime() + environment.checkSessionInterval,
    ); // 5 minute = 60000 milliseconds
 
    if (accessTokenExpiry >= checkExpirtyDateTime) {
      console.log('Token is valid');
      return data.accessToken;
    } else {
      console.log('Access token is expired');
      const inProgress = JSON.parse(
        await AsyncStorage.getItem(isRefreshingToken),
      );
      if (inProgress == 'isRefreshingToken') {
        console.log('Refrsh token already in progrss, wait after 2 sec');
        await sleep(2000);
        console.log('Get if new token available.');
        if (retry >= 3)
          await AsyncStorage.setItem(isRefreshingToken, JSON.stringify(false));
        return await getToken(retry + 1);
      } else {
        console.log('Calling refresh token api.');
        const newToken = await refreshToken();
        console.log('got the new token.', newToken);
        return newToken;
      }
    }
  } catch (e) {
    console.error('Error retrieving token:', e);
    return null;
  }
};
 
export const refreshToken = async () => {
  console.log('Refreshing token');
  await AsyncStorage.setItem(isRefreshingToken, JSON.stringify(true));
 
  const data = await getTokenData();
  return new Promise((resolve, reject) => {
    postNoAuth(API.REFRESH_TOKEN, {
      refreshToken: data?.refreshToken,
    })
      .then(res => {
        console.log('Refreshing token, new token recieved');
        storeTokenData(res);
        resolve(res.accessToken);
      })
      .catch(err => {
        console.log('Refreshing token, failed', err);
        reject(err);
      })
      .finally(async () => {
        console.log('Refreshing token, finished');
        await AsyncStorage.setItem(isRefreshingToken, JSON.stringify(false));
      });
  });
};
 
export function checkSessionState() {
  return new Promise(async (resolve, reject) => {
    console.log('checkSessionState invoked');
    const netInfoState = await NetInfo.fetch();
    if (isUserLoggedIn() && netInfoState.isConnected) {
      const data = await getTokenData();
      if (data?.refreshToken) {
        getAuth(API.CHECK_SESSION)
          .then(() => {
            console.log('CHECK_SESSION response Success');
            return resolve(true);
          })
          .catch(err => {
            console.log('CHECK_SESSION catch', err);
            if (err.status === 401) {
              return resolve(false);
            }
          });
      } else {
        console.log('checkSessionState getTokenData data', data);
        return resolve(false);
      }
    } else {
      return resolve(false);
    }
  });
}