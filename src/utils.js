const googleToken = 'googleToken';
const getstreamToken = 'getstreamToken';
const userName = 'userName';
const userId = 'userId';

export const setGoogleToken = restoken => {
  return localStorage.setItem(googleToken, restoken);
};

export const getGoogleToken = () => {
  return localStorage.getItem(googleToken);
};

export const setUserName = resUserName => {
  return localStorage.setItem(userName, resUserName);
};

export const getUserName = () => {
  return localStorage.getItem(userName);
};

export const setUserId = resUserId => {
  return localStorage.setItem(userId, resUserId);
};

export const getUserId = () => {
  return localStorage.getItem(userId);
};

export const setGetstreamToken = restoken => {
  return localStorage.setItem(getstreamToken, restoken);
};

export const getGetstreamToken = () => {
  return localStorage.getItem(getstreamToken);
};
