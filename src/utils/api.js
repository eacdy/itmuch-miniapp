// 后端接口基础路径
// export const BASE_API_URL = 'https://t.itmuch.com';
export const BASE_API_URL = 'http://127.0.0.1:8040';
// 登录地址
export const LOGIN_URL = BASE_API_URL + '/users/login';
// 公告接口地址
export const NOTICE_URL = BASE_API_URL + '/notices/newest';
// share
export const SHARE_POST_URL = BASE_API_URL + '/shares';
// 预览地址
export const SHARE_POST_PREVIEW_URL = SHARE_POST_URL + '/preview';
// 用户主地址
export const USER_URL = BASE_API_URL + '/users';
// 签到地址
export const SIGN_URL = USER_URL + '/sign';
// 转发地址
export const FORWARD_URL = USER_URL + '/forward';
// 我的积分明细
export const USER_BONUS_LOG_URL = USER_URL + '/bonus-logs';
// 我的投稿
export const USER_MY_CONTRIBUTION_URL = USER_URL + '/contributions';
// 当前登录人员的个人信息
export const USER_URL_ME = USER_URL + '/me';
// 完善个人信息
export const USER_URL_COMPLETE = USER_URL + '/complete';
// 投稿
export const SHARE_POST_CONTRIBUTE_URL = SHARE_POST_URL + '/contribute';
