import { DefaultError } from '@commons/DefaultError';
import express, { NextFunction, Request, Response } from 'express';

export const errorHandling = express.Router();

errorHandling.use((err: DefaultError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DefaultError) {
    res.status(err.status).json({
      status: err.status,
      message: err.getDefaultMessage(),
    });
  }
});
