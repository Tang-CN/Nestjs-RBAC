export const USER_ERR = {
  USER_EXISTS: { code: 10001, message: '用户已存在' },
  USER_NOT_LOGIN: { code: 10002, message: '用户未登录' },
}

export const PERMISSION_ERR = {
  PERMISSION_NOT_ENOUGH: { code: 10004, message: '权限不足' },
}

export const ERR = {
  ...USER_ERR,
  ...PERMISSION_ERR,
}
