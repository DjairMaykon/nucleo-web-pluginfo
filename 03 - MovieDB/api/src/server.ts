import dotenv from 'dotenv';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { DefaultError } from '@commons/DefaultError';

dotenv.config();

const app = express();

app.use(cors());

app.use(routes);

app.use((err: DefaultError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({
    status: err.status,
    message: err.getDefaultMessage(),
  });
});

app.listen(process.env.port, () => {
  console.log('listening on port ' + process.env.port);
});
