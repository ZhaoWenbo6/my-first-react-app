import { API_USER_INFO, CLASSIFICATION } from '../consts/api';

export function user() {
  return () => ({
    method: 'get',
    path: API_USER_INFO,
  });
}

export function classification(params) {
  return () => ({
    method: 'get',
    path: CLASSIFICATION,
    params: params,
  });
}
