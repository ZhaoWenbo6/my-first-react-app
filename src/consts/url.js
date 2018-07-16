export const LOGIN_PAGE = `http://ssa.jd.com/sso/login?ReturnUrl=http://bjshare.cms.jd.${
  process.env.DEPLOY_ENV === 'master' ? 'local' : 'care'
}/dataStatic/index.do`;
