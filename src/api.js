import axios from "axios";

import {URL} from './consts.js';

const ErrorStatus = {
  BAD_REQUES: 400,
  UNAUTH: 401,
  SERVER_UNAVAILABLE: 503,
};

const TIMEOUT = 5000;

const createApi = (errorHandlers) => {
  const api = axios.create({
    baseURL: URL.BASE,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    switch (response.status) {
      case ErrorStatus.UNAUTH:
        errorHandlers.onUnAuthorized();
        throw err;

      case ErrorStatus.SERVER_UNAVAILABLE:
        errorHandlers.showError(response.statusText, response.status);
        throw err;

      case ErrorStatus.BAD_REQUES:
        errorHandlers.showError(response.statusText, response.status);
        throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

export default createApi;
