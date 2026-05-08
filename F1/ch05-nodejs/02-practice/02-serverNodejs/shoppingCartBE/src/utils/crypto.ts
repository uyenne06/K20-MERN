import { createHash } from 'crypto'
// Hàm mã hóa 1 nội dung bất kỳ theo chuẩn

// SHA256 + digest hex
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
