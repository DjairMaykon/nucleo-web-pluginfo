import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.listen(process.env.port, () => {
  console.log('listening on port ' + process.env.port);
});
