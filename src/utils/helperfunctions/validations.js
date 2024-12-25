import moment from 'moment';
export const ValueEmpty = value => {
  if (value?.trim()) {
    return false;
  }
  return true;
};

export const ValidateMobile = mobile => {
  const reg = new RegExp('^\\d+$');

  if (ValueEmpty(mobile)) {
    return '*Required';
  } else if (!reg.test(mobile)) {
    return 'Invalid mobile number';
  } else if (mobile.length < 10) {
    return 'Please enter 10 digit mobile number';
  } else return 'success';
};

export const specialCharactorRemove = value => {
  const reg = new RegExp(/^[0-9a-zA-Z\_]+$/);
  if (!reg.test(value)) {
    return 'Special characters are not allowed';
  } else return 'success';
};

export const ValidateMail = email => {
  // if (ValueEmpty(email)) {
  //   return 'Please provide valid email';
  // }
  const emailPattern =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return 'Please provide valid email';
  }
  return 'success';
};

export const ValidatePassword = password => {
  var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (ValueEmpty(password)) {
    return 'Please provide a password to keep your account secure';
  } else if (password.length < 4 || password.length > 16) {
    return 'Password should be 8-16 characters long';
  } else if (!reg.test(password)) {
    return 'Password should be alphanumeric & it contain atleast one special character';
  }

  return 'success';
};

export const ifEmail = str => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(str);
};

export const handleAPIErrorResponse = (response, caller) => {
  const {status, problem, data} = response;

  if (status === 200) {
    return;
  }

  if (status === 404) {
    throw `error in ${caller}: NOT FOUND`;
  }

  if (status === 500) {
    throw `error in ${caller}: SERVER ERROR`;
  }

  if (problem === 'CLIENT_ERROR') {
    throw `error in ${caller}: CLIENT_ERROR`;
  }
};

export const dateFormet = () => {
  const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
  return currentDate;
};
