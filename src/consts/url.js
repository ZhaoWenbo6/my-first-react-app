export const LOGIN_PAGE = `https://ssa.jd.com/sso/login?ReturnUrl=http://bjshare.cms.jd.${
  process.env.DEPLOY_ENV === 'master' ? 'local' : 'care'
}/index.do`;

export const LOGOUT_PAGE = `https://ssa.jd.com/sso/logout?ReturnUrl=http://bjshare.cms.jd.${
  process.env.DEPLOY_ENV === 'master' ? 'local' : 'care'
}/index.do`;
