import {environment} from '../constant';

class Endpoints {
  baseUrl = environment.baseUrl;
  LOGIN_AUTH = this.baseUrl + 'login';
  ARCHIVED = this.baseUrl + 'checklist/archived-data';
  SAVE_CHECKLIST = this.baseUrl + 'checklist';
  LOGOUT = this.baseUrl + 'logout';
  GET_CHECKLIST = this.baseUrl + 'checklist/master/full';
  GET_SUBMITED_CHECKLIST = this.baseUrl + 'checklist';
  REFRESH_TOKEN = this.baseUrl + 'refresh-token';
  GET_USER_PROFILE = this.baseUrl + 'user/details';
  GET_RESPONSE_IMAGES = this.baseUrl + 'checklist/master/images';
  Change_Password = this.baseUrl + 'change-password';
  VERSION = this.baseUrl;
  CHECK_SESSION = this.baseUrl + 'check-session';
  DELETE_CHECKLIST = this.baseUrl + 'checklist/';
  GET_VIDEO = this.baseUrl + 'bci-product/videos';
  GET_PDF = this.baseUrl + 'bci-product/pdf';

  // npm i react-native-picker-select --legacy-peer-deps
}

export const API = new Endpoints();
