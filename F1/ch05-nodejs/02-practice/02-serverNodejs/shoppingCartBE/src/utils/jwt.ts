import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayLoad } from '~/models/request/User.requests'
dotenv.config()

//tạo ra hàm ký token
export const signToken = ({
  payload, //
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: any
  privateKey: string
  options?: jwt.SignOptions
}) => {
  //đừng thiếu return
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, function (err, token) {
      if (err) throw reject(err)
      return resolve(token as string)
    })
  })
}

// verifyToken
// hàm nhận vào token, kiểm tra token và trả ra payload(decoded)
// payload thông tin của user
export const verifyToken = ({
  token, //
  privateKey
}: {
  token: string
  privateKey: string
}) => {
  return new Promise<TokenPayLoad>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayLoad)
    })
  })
}
