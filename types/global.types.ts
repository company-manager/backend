import { Request, Response, NextFunction } from 'express'

export type HttpCallback = {
  req: Request
  res: Response
  next?: NextFunction
}
