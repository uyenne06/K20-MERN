import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) //chạy checkSchema và lưu lỗi vào req
    const error = validationResult(req) //khưi lỗi ra
    //nếu k có lỗi thì qua bước tiếp theo, k check nữa
    if (error.isEmpty()) {
      return next()
    }
    //nếu có lỗi thì thổng hợp lỗi lại
    //hầu hết các lỗi là 422
    const errorObject = error.mapped() // đây là lỗi ban đầu xấu quắc
    const entityError = new EntityError({
      errors: {}
    }) //đây là cấu trúc lỗi đẹp mình muốn trả về

    //tí nữa mình sẽ độ lại errorObject này
    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (
        msg instanceof ErrorWithStatus &&
        msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY //422
      ) {
        return next(msg) //ném cho ErrorHandler Tổng
      }
      entityError.errors[key] = msg
    }
    return next(entityError)
  }
}
