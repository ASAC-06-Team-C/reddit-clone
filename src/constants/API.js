/**
 * 사용 방법
 * GET : MAIN_DOMAIN + <개인 사용 도메인> + '?key=value'
 * POST : MAIN_DOMAIN + <개인 사용 도메인>, body 는 개인 적용
 */

export const MAIN_DOMAIN = 'http://api.reddit-clone.com'

// 개인 사용 도메인 추가
export const PATH_POSTS = '/posts'
export const PATH_DRAFTS = '/drafts'
export const PATH_COMMENTS = '/comments'
