export const USER_ERR = {
  USER_EXISTS: { code: 10001, message: '用户已存在' },
  USER_NOT_LOGIN: { code: 10002, message: '用户未登录' },
  USER_NOT_EXISTS: { code: 10003, message: '用户不存在' },
  USER_PASSWORD_ERROR: { code: 10004, message: '用户密码错误' },
  USER_DISABLED: { code: 20005, message: '用户已被禁用' },
}

export const AUTH_ERR = {
  TOKEN_EXPIRED: { code: 20001, message: 'token 已过期' },
  TOKEN_INVALID: { code: 20002, message: 'token 无效' },
  REFRESH_TOKEN_EXPIRED: { code: 20003, message: 'refresh_token 已过期' },
  REFRESH_TOKEN_INVALID: { code: 20004, message: 'refresh_token 无效' },
}

export const PERMISSION_ERR = {
  PERMISSION_NOT_ENOUGH: { code: 10004, message: '权限不足' },
}

export const ERR = {
  ...USER_ERR,
  ...AUTH_ERR,
  ...PERMISSION_ERR,
}
