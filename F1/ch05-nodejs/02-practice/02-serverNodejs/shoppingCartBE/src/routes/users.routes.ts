import express from 'express'
import { wrap } from 'lodash'
import {
  changePasswordController,
  emailVerifyController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  forgotPasswordTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  RefreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator
} from '~/middlewares/users.middlewares'
import RefreshToken from '~/models/RefreshTokens.schema'
import { ChangePasswordReqBody, UpdateMeReqBody } from '~/models/request/User.requests'
import { wrapAsync } from '~/utils/handler'
const usersRoutes = express.Router()

//Request: headers(nta cho mình pass mình giữ và mình gửi lên lại) |
//body(đưa pass mình mún gửi lên server) | param | query
/*login
path: users/login
method: POST
body: {
    email: string,
    password: string
}
loginValidator: kiểm tra email và password
loginController: đóng gói kiện và gửi kết quả
*/
usersRoutes.post('/login', loginValidator, wrapAsync(loginController))

/*Register
path: /users/register
method: POST
body: {
    email: string,
    password: string,
    confirm_password: string,
    name: string,
    date_of_birth: ISO8601
}
*/
usersRoutes.post(
  '/register',
  registerValidator, //
  wrapAsync(registerController)
)

/*logout: đăng xuất
method: post
Header{
  Authorization: 'Bearer access_token'
}
body{
  refresh_token: string, 
}

*/
usersRoutes.post(
  '/logout', //
  accessTokenValidator,
  RefreshTokenValidator,
  wrapAsync(logoutController)
)

/*verify-email
describe: người dùng vào email để bấm vào link xác thực, link này thật chất 
là gửi lại email_verify_token lên server để server xác thực 
path: /users/verify-email/?email_verify_token=string
method: get (vì người dùng chỉ bấm vào link)
query:{
  email_verify_token: string
}
*/
usersRoutes.get(
  '/verify-email/', //
  emailVerifyTokenValidator,
  wrapAsync(emailVerifyController)
)

/*resend-verify-email
des: người dùng muốn verify-email nhưng chưa|không có link 
path: /users/resend-verify-email
method: POST (cần biết người dùng là ai để gửi mail của người dùng đó)
headers{
  Authorization: 'Bearer access_token'
}
*/
usersRoutes.post(
  '/resend-verify-email',
  accessTokenValidator, //hàm làm rồi không làm nữa
  wrapAsync(resendVerifyEmailController)
)

/*forgot-password
path: /users/forgot-password
method: POST
body: {
  email: string
}
*/
usersRoutes.post(
  '/forgot-password', //
  forgotPasswordValidator, //kiểm tra email trong body
  wrapAsync(forgotPasswordController)
)

/*verify-forgot-password
des: người dùng bấm vào link trong mail là gửi forgot_password_token cho FE
FE sẽ gửi lại forgot_password_token về BE để kiểm tra verify
trước khi hiển thị giao diện nhập mật khẩu mới 
path: /users/verify-forgot-password
method: POST
body:{
  forgot_password_token: string 
}
*/
usersRoutes.post(
  '/verify-forgot-password', //
  forgotPasswordTokenValidator,
  wrapAsync(verifyForgotPasswordController)
)

/*reset-password
des: người dùng nhập mật khẩu mới và gửi về BE để cập nhật 
path: /users/reset-password
method: POST
body: {
  forgot_password_token: string,
  password: string,
  confirm_password: string
}
*/
usersRoutes.post(
  '/reset-password', //
  forgotPasswordTokenValidator, //kiểm tra forgot_password_token có rồi
  resetPasswordValidator,
  wrapAsync(resetPasswordController)
)
//login | forgot-password | reset-pasword | test lại login

/*getMe
des: lấy thông tin của người dùng đang đăng nhập 
path: /users/me
method: POST(vì mình phải cho hệ thống biết mình là ai)
headers{
  Authorization: 'Bearer access_token' (cung cấp access_token để biết mình là ai )
}
*/
usersRoutes.post(
  '/me',
  accessTokenValidator, //verify access_token mình làm rồi
  wrapAsync(getMeController)
)

/*updateMe
des: update profile của user
path: '/me'
method: patch
Header: {Authorization: Bearer <access_token>}
body: {
  name?: string
  date_of_birth?: Date
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
*/

usersRoutes.patch(
  '/me', //
  accessTokenValidator, //
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'avatar',
    'bio',
    'cover_photo',
    'date_of_birth',
    'location',
    'name',
    'username',
    'website'
  ]),
  wrapAsync(updateMeController)
)

/*change-password
des: khi người dùng đã 'đăng nhập' muốn đổi mật khẩu 
path: /users/change-password
method: PATCH/ PUT 
headers{
  Authorization: 'Bearer access_token'
}
body:{
  old_password: string, 
  password: string, 
  confirm_password: string
}
*/

usersRoutes.put(
  '/change-password', //
  accessTokenValidator, // có rồi không làm nữa
  changePasswordValidator, //kiểm tra old_password, password, confirm_password
  // filterMiddleware<changePasswordReqBody>([]),
  wrapAsync(changePasswordController)
)

/*RefreshToken
des: khi mã access_token hết hạn thì client sẽ gửi refresh_token lên để xin 
access_token và refresh_token mới 
path: 'users/refresh-token'
method: POST
body:{
  refresh_token: string
}
*/

usersRoutes.post(
  '/refresh-token', //
  RefreshTokenValidator, //mình đã làm hàm verify refresh_token rồi
  wrapAsync(refreshTokenController)
)
export default usersRoutes
