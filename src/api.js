import axios from "axios";

import {URL} from './consts.js';

const ErrorStatus = {
  UNAUTH: 401,
};

const TIMEOUT = 5000;

const createApi = (onUnAuthorized) => {
  const api = axios.create({
    baseURL: URL.BASE,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    if (response.status === ErrorStatus.UNAUTH) {
      onUnAuthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createApi;