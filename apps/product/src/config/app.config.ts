import { AppConfigsType } from '@app/app';
import { registerAs } from '@nestjs/config';

export default registerAs(
   'app',
   (): AppConfigsType => ({
      host: process.env.HOST,
      port: Number(process.env.PORT),
      prefix: process.env.PREFIX,
      mongoUri: process.env.MONGO_URI,
   }),
);
