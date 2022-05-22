import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandling } from './errorHandling';

dotenv.config();

export const app = express();

app.use(cors());

app.use(routes);
app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
