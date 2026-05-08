import User from '~/models/User.schema'
import databaseServices from './database.services'
import { LoginReqBody, RegisterReqBody, TokenPayLoad, UpdateMeReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { StringValue } from 'ms'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import RefreshToken from '~/models/RefreshTokens.schema'
import { ObjectId } from 'mongodb'
import { update } from 'lodash'

class UsersService {
  private signAccesToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signEmailVerifyToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      payload: { user_id, token_type: TokenType.EmailVerificationToken },
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signForgotPasswordToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      payload: { user_id, token_type: TokenType.ForgotPassWordToken },
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    const result = await databaseServices.users.insertOne(
      new User({
        username: `user${user_id}`,
        _id: user_id,
        email_verify_token,
        ...payload,
        date_of_birth: new Date(payload.date_of_birth), //ghi đè lại date of birth
        password: hashPassword(payload.password)
      })
    )
    //ký ac và rf
    const [access_token, refresh_token] = await Promise.all([
      this.signAccesToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])
    //lưu rf vào database!!!
    await databaseServices.refeshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token
      })
    )
    //email_verify_token thì phải gửi qua email
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)
    //
    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }

  async login(payload: LoginReqBody) {
    const user = await databaseServices.users.findOne({
      ...payload, //
      password: hashPassword(payload.password)
    })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    //nếu có thì phải tạo ac và rf từ user_id của user tìm dc
    const user_id = user._id.toString()
    //ký 2 mã cùng lúc
    const [access_token, refresh_token] = await Promise.all([
      this.signAccesToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //lưu rf vào database
    await databaseServices.refeshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: refresh_token
      })
    )

    return {
      access_token,
      refresh_token
    }
  }

  async checkRefreshToken({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    //tìm xem có không ? nếu không có thì nghĩa là bị banned rồi mà vẫn cố tình dùng lại mã cũ
    const refreshToken = await databaseServices.refeshTokens.findOne({
      user_id: new ObjectId(user_id),
      token: refresh_token
    })
    //nếu k tìm thấy
    if (!refreshToken) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
      })
    }
    //nếu có thì
    return true
  }

  async logout(refresh_token: string) {
    await databaseServices.refeshTokens.deleteOne({
      token: refresh_token
    })
    return true
  }

  async checkEmailVerifyToken({
    user_id, //
    email_verify_token
  }: {
    user_id: string
    email_verify_token: string
  }) {
    //tìm user sở hữu 2 thông tin này cùng lúc: kiểm tra xem user có đang sở hữu cái evt này k
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id),
      email_verify_token
    })
    //nếu không tìm thấy user thì nghĩa là evt này k hợp lệ
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_INVALID
      })
    }
    //nếu có thì thôi
  }

  async verifyEmail(user_id: string) {
    //cập nhật lại user
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            email_verify_token: '', //
            updated_at: '$$NOW',
            verify: UserVerifyStatus.Verified
          }
        }
      ]
    )
    //hết
  }

  async getVerifyStatus(user_id: string) {
    //tìm user thông qua user_id
    const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
    //nếu k có thì ném lỗi
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, //401
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //nếu có thì
    return user.verify //chỉ return trạng thái verify, k dc return user ra controller
    //nếu không thì bị lộ rất nhiều thông tin nhạy cảm
  }

  async resendVerifyEmail(user_id: string) {
    //tạo email_verify_token mới
    const email_verify_token = await this.signEmailVerifyToken(user_id)
    //cập nhật lại user với email_verify_token mới
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            email_verify_token: '', //
            updated_at: '$$NOW',
            verify: UserVerifyStatus.Verified
          }
        }
      ]
    )
    //gửi email(lấy console từ cái register ở trên)
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)
  }

  //forgotPassword
  async forgotPassword(email: string) {
    //tìm user thông qua email để lấy id để ký
    const user = await databaseServices.users.findOne({ email })
    //
    const user_id = user!._id.toString()
    //tạo forgot_password_token từ user_id
    const forgot_password_token = await this.signForgotPasswordToken(user_id)
    //cập nhật lại user với forgot_password_token mới
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            forgot_password_token, //
            updated_at: '$$NOW'
          }
        }
      ]
    )
    //gửi email(lấy console từ cái register ở trên)
    console.log(`http://localhost:8000/users/reset-password/?forgot_password_token=${forgot_password_token}`)
  }

  async checkForgotPasswordToken({
    user_id,
    forgot_password_token
  }: {
    user_id: string
    forgot_password_token: string
  }) {
    //với 2 thông tin trên mình tìm user sở hữu cả 2
    //nếu có nghĩa là mã token còn hiệu lực
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id),
      forgot_password_token
    })
    //nếu k có
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_INVALID
      })
    }
    //nếu có thì thôi, k cần làm gì cả
  }

  async resetPassword({ user_id, password }: { user_id: string; password: string }) {
    //tiến hành cập nhật user
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //filter
      [
        {
          $set: {
            password: hashPassword(password),
            forgot_password_token: '', //xóa token đi
            updated_at: '$$NOW' //đừng thiếu ed
          }
        }
      ]
    )
    //nếu xong thì thôi
  }

  async getMe(user_id: string) {
    const user = await databaseServices.users.findOne(
      { _id: new ObjectId(user_id) }, //
      {
        //select
        projection: {
          password: 0, //0 : false (ko hiện thị trường này)
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    //nếu mà tìm k có thì sao
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //nếu có thì return userInfor ra ngoài
    return user
  }

  async updateMe({ user_id, payload }: { user_id: string; payload: UpdateMeReqBody }) {
    //trong payload có date_of_birth và username là 2 trường đặc biệt
    const _payload = payload.date_of_birth //
      ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } //
      : payload //
    //nếu người dùng muốn update username thì phải xem nó có bị trùng k
    if (payload.username) {
      const user = await databaseServices.users.findOne({
        username: payload.username
      })
      //nếu có user dùng rồi thì báo lỗi
      if (user) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
          message: USERS_MESSAGES.USERNAME_ALREADY_EXISTS
        })
      }
    }
    //tiến hành cập nhật
    const userInfor = await databaseServices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      [
        {
          $set: {
            ..._payload, //
            updated_at: '$$NOW'
          }
        }
      ],
      {
        returnDocument: 'after', //trả về document sau khi update
        projection: {
          password: 0, //0 : false (ko hiện thị trường này)
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    //
    return userInfor
  }

  async changePassword({
    user_id,
    old_password, //
    password
  }: {
    user_id: string
    old_password: string
    password: string
  }) {
    //tìm user dựa trên thông tin cũ nếu có thì mới cập nhật
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id),
      password: hashPassword(old_password)
    })
    //nếu không có thì báo lỗi luôn
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //nếu có thì tiến hành cập nhật password mới cho user
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //filter
      [
        {
          $set: {
            password: hashPassword(password),
            updated_at: '$$NOW'
          }
        }
      ]
    )
    //xong thì thôi
  }

  async refreshToken({
    user_id, //
    refresh_token
  }: {
    user_id: string
    refresh_token: string
  }) {
    //xóa refresh_token cũ
    await databaseServices.refeshTokens.deleteOne({
      user_id: new ObjectId(user_id), //
      token: refresh_token
    })
    //ký 2 mã mới và gửi cho người dùng
    const [access_token, new_refresh_token] = await Promise.all([
      this.signAccesToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //lưu rf vào database
    await databaseServices.refeshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token
      })
    )
    return {
      access_token,
      refresh_token: new_refresh_token
    }
  }
}

const usersService = new UsersService()
export default usersService
