import { API_USER_INFO } from '../consts/api';

export function user() {
  return () => ({
    method: 'get',
    path: API_USER_INFO,
  });
}
