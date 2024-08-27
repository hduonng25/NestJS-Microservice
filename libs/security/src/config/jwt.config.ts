import { JwtConfigType } from '@app/app';
import { registerAs } from '@nestjs/config';

export default registerAs(
   'jwt',
   (): JwtConfigType => ({
      secret:
         process.env.SECRET ||
         'crScOu6FYCs4JQ2aK6fjWpr+UCLCNRzbEMMw28keie22uOH0onwu6V2wDejMxjC62IKHbeseQCAVuNmrRZ0IT9T8DHwNBY1q1kOXSYd1dkAyyTuoWaWB9TFPuqNxrlKONcHa+27oquoWkIqeuqxwQQFI4JO1xKgZMLwMOL3n8MU4wpUArn7rzAkVaGgjk3weyK9UdecLp2W48XbzJmqgTFkKV2dljlH4ixO6bPR92DPG45FUD+VnLHpA5Xg0abq3o+YKh7QpPI93J7srzXENr3jG0W4B0BCQSmr8MECx8c5DIZLvEYJrplIcyfkZtlVL0OrOe4rwOz/r52Pap74VMw==',
      refresh: process.env.REFRESH,
      expiredTime: Number(process.env.EXPIRED_TIME),
   }),
);
