import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import {
  ChangePasswordReqBody,
  EmailVerifyReqQuery,
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayLoad,
  UpdateMeReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/request/User.requests'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { UserVerifyStatus } from '~/constants/enums'
import User from '~/models/User.schema'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>, //
  res: Response
) => {
  //code mà vào dc đây tức là dữ liệu truyền lên ngon
  //body có email và password ngon, chỉ cần kiểm tra đúng không thôi
  const result = await usersService.login(req.body)
  //gửi result cho client
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result // ac và rf để nó truy cập
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>, //
  res: Response,
  next: NextFunction
) => {
  //kiểm tra tính đúng của dữ liệu có liên quan đến database
  //  *** ở controller dữ liệu đã sạch và đủ***
  //  - kiểm tra email này đã có người sử dụng chưa ?
  const isExisted = await usersService.checkEmailExist(req.body.email)
  if (isExisted) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  }
  //  - tạo user mới trên database
  const result = await usersService.register(req.body)
  //response đóng gói kết quả
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>, //
  res: Response
) => {
  //tới đây là qua dc 2 middleware rồi
  //và 2 middleware này đã decoded access và refresh rồi
  const { user_id: user_id_ac } = req.decoded_authorization as TokenPayLoad
  const { user_id: user_id_rf } = req.decoded_refresh_token as TokenPayLoad

  if (user_id_ac !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }
  //nếu ac và rf có thông tin khớp nhau luôn thì quá ngon
  //mình xóa rf trên database là xong
  const { refresh_token } = req.body
  //kiểm tra xem refresh_token còn trên hệ thống không
  await usersService.checkRefreshToken({
    user_id: user_id_ac,
    refresh_token
  })
  //nếu mà có thì logout
  await usersService.logout(refresh_token)
  //
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}

export const emailVerifyController = async (
  req: Request<ParamsDictionary, any, any, EmailVerifyReqQuery>, //
  res: Response
) => {
  const { email_verify_token } = req.query
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad
  //kiểm tra email_verify_token có thực sự thuộc sở hữu của user đó không ?
  const user = await usersService.checkEmailVerifyToken({
    user_id,
    email_verify_token
  }) //nếu có lỗi thì hàm trên sẽ ném lỗi, còn k thì thôi

  //verify email: xóa email_verify_token và đổi verify: từ 0 thành 1
  await usersService.verifyEmail(user_id) //
  //gửi response
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS
  })
}

export const resendVerifyEmailController = async (
  req: Request, //
  res: Response
) => {
  //0. lấy user_id từ decoded_access_token vì mình có verify access_token trước đó ở
  //  middlerware rồi
  const { user_id } = req.decoded_authorization as TokenPayLoad
  //1. tìm thông tin user xem trạng thái verify của nó như thế nào
  const verifyStatus = await usersService.getVerifyStatus(user_id)
  //nếu đã verify thì thông báo là không cần gửi lại
  if (verifyStatus == UserVerifyStatus.Verified) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu bị banned thì không gửi
  if (verifyStatus == UserVerifyStatus.Banned) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.ACCOUNT_HAS_BEEN_BANNED
    })
  }
  //nếu chưa verify thì gửi lại
  if (verifyStatus == UserVerifyStatus.Unverified) {
    //resendVerifyEmail: tạo email_verify_token mới, cập nhật lại user và gửi email
    await usersService.resendVerifyEmail(user_id)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    })
  }
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>, //
  res: Response
) => {
  //dựa vào email kiểm tra xem user này có tồn tại không
  //email này có tồn tại trong hệ thống không ?
  const { email } = req.body
  const isExisted = await usersService.checkEmailExist(email)
  if (!isExisted) {
    //nhớ có ! nha "nếu email k tồn tại thì sao mà lấy lại mật khẩu"
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED, //401
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //nếu có tồn tại thì mình sẽ tạo forgot_password_token và lưu vào user
  //đồng thời gửi link forgot_password_token cho người dùng qua email
  await usersService.forgotPassword(email)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHECK_YOUR_EMAIL
  })
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response
) => {
  //kiểm tra xem forgot_password_token có còn thuộc sở hữu của
  //user_id hay không
  const { forgot_password_token } = req.body
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  await usersService.checkForgotPasswordToken({
    user_id,
    forgot_password_token
  })
  //nếu có thì forgot_password_token đã verify
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>, //
  res: Response
) => {
  //vì người dùng có gửi forgot_password_token
  //nên mình cần kiểm tra xem nó có hợp lệ với user_id không
  const { forgot_password_token, password } = req.body
  const { user_id } = req.decoded_forgot_password_token as TokenPayLoad
  await usersService.checkForgotPasswordToken({
    user_id,
    forgot_password_token
  })
  //nếu có thì mình tiến hành đổi mật khẩu
  await usersService.resetPassword({
    user_id,
    password
  })
  //nếu ok hết thì
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS
  })
}

export const getMeController = async (
  req: Request, //
  res: Response
) => {
  //kiểm tra xem user_id còn tồn tại ko, nếu có thì hiển thị thông tin
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const userInfor = await usersService.getMe(user_id)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: userInfor
  })
}

export const updateMeController = async (
  req: Request<ParamsDictionary, any, UpdateMeReqBody>, //
  res: Response
) => {
  //kiểm tra xem user_id đã verify chưa, nếu có thì mới cho update profile
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const verify = await usersService.getVerifyStatus(user_id)
  //nếu trạng thái verify của người dùng k phải là verified thì mình k cho update prf
  if (verify != UserVerifyStatus.Verified) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message: USERS_MESSAGES.USER_NOT_VERIFIED
    })
  }
  await usersService.updateMe({ user_id, payload: req.body })
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS
  })
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, any, ChangePasswordReqBody>, //
  res: Response
) => {
  //mình có kiểm tra access_token ở middleware rồi
  //nên chắc chắn sẽ có decoded_authorization
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const { old_password, password } = req.body
  //tiến hành đổi mật khẩu
  await usersService.changePassword({
    user_id,
    old_password,
    password
  }) //hàm này chưa code : kiểm tra old_password đúng không r mới đổi password
  //nếu đổi thành công thì
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHANGE_PASSWORD_SUCCESS
  })
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>, //
  res: Response
) => {
  //kiểm tra xem refresh_token còn tồn tại trong hệ thống không
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const { refresh_token } = req.body
  await usersService.checkRefreshToken({ user_id, refresh_token })
  //kiểm tra xong thì tiến hành tạo ra ac và rf mới và gửi cho client
  const result = await usersService.refreshToken({
    user_id,
    refresh_token
  }) //hàm trả ra ac và rf mới
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}
