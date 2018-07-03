import { getUserInfo } from '../actions/user';

export default context => {
  context.store.dispatch(getUserInfo());
  // const getAndParseUserInfo = JSON.parse(
  //   decodeURIComponent(
  //     document.cookie.replace(/(?:(?:^|.*;\s*)user_inf\s*\=\s*([^;]*).*$)|^.*$/, '$1')
  //   )
  // );
};
