import { logger } from './application/logging';
import { web } from './application/web';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

web.listen(port, () => {
  logger.info(`Listening on port http://localhost:${port}`);
});
