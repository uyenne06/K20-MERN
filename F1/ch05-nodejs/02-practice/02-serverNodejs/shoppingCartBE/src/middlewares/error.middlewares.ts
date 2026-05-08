import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (
  err: any, //
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //lỗi err có thể là bất cứ dạng lỗi nào, mình k lường trước dc
  //nếu là lỗi do mình chủ đích tạo ra thì nó là ErrorWithStatus và
  //có status
  //lỗi về đay sẽ có lỗi ErrorWithStatus
  if (err instanceof ErrorWithStatus) {
    return res
      .status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR) //
      .json(omit(err, ['status']))
  }

  //nếu là lỗi khác thì phải đưa các property về enumerable true
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) //
    .json(omit(err, ['stack']))
}
