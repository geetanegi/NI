import {
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const isValidDate = datestring => {
  const d = new Date(datestring);
  return d instanceof Date && !isNaN(d);
};

export const getAge = (dob, checkDate) => {
  const start = new Date(dob);
  const end = new Date(checkDate);

  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  const dayDiff = end.getDate() - start.getDate();

  let years = yearDiff;
  let months = monthDiff;
  let days = dayDiff;

  // Adjust for negative differences
  if (dayDiff < 0) {
    const lastDayOfMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0,
    ).getDate();
    days = lastDayOfMonth + dayDiff;
    months -= 1;
  }

  if (monthDiff < 0) {
    months += 12;
    years -= 1;
  }

  return {years, months, days};
};

export const isAgeGreaterThan5Months = age => {
  console.log('isAgeGreaterThan5Months', age);
  return age.years > 0 || age.months > 5 || (age.months == 5 && age.days > 0);
};

export const sleep = time =>
  new Promise(resolve => setTimeout(() => resolve(), time));

  export const historyDownload = async (title, url) => {
    if (Platform.OS === 'ios') {
      const data = downloadHistory(title, url);
      return data;
    } else {
      if (Platform.OS === 'android' && Platform.constants['Release'] >= 13) {
        // alert('No need take to permission For andrid 13');
        const data = downloadHistory(title, url);
        return data;
      } else {
        try {
          return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              ttitle: 'Storage Permission',
              message:
                'Nutrition International needs access to your external storage ' +
                'so you can save your downloaded files.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              const data = downloadHistory(title, url);
              return data;
            } else {
              //If permission denied then show alert 'Storage Permission
              alert('Permission not granted, Please take permission');
            }
          });
        } catch (err) {
          //To handle permission related issue
        }
      }
    }
  };
  
  const downloadHistory = async (title, url) => {
    let date = new Date();
    const {dirs} = ReactNativeBlobUtil.fs;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: title,
        mime: 'application/pdf',
        appendExt: 'pdf',
        description: title,
        path: `${dirs.DownloadDir}/${title}-${Math.floor(
          date.getTime() + date.getSeconds() / 2,
        )}`,
      },
    };
  
    return ReactNativeBlobUtil.config(options)
      .fetch('GET', url)
      .then(res => {
        // android.actionViewIntent(res.path(), 'application/pdf')
        return res;
      })
      .catch(e => {
        alert('Error');
      });
  };
