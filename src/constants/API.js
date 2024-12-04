/**
 * 사용 방법
 * GET : MAIN_DOMAIN + <개인 사용 도메인> + '?key=value'
 * POST : MAIN_DOMAIN + <개인 사용 도메인>, body 는 개인 적용
 */
// 실제 사용시 : http://api.reddit-clone.com
export const MAIN_DOMAIN = 'http://localhost:8080'

// 개인 사용 도메인 추가
export const PATH_POSTS = '/posts'
export const PATH_DRAFTS = '/drafts'
export const PATH_COMMENTS = '/comments'
export const PATH_USERS = '/users'
export const PATH_USER_REGISTER = '/users/register'
