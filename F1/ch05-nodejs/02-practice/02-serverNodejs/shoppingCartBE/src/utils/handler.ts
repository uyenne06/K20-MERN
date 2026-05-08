// hàm nhận vào RequestHandler: (req, res, next) => {}
// và biến nó thành 1 RequestHandler khác
import { NextFunction, Request, Response, RequestHandler } from 'express'

// có cấu trúc try catch next
export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
