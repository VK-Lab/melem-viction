export const config = {
  port: 4000,
  isDebuggingOtp: process.env.IS_DEBUGGING_OTP || false,
  isDebugging: process.env.IS_DEBUGGING || false,

  // Mongodb.
  mongodb: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
  },

  jwtSecret: 'bdK2PNTSV0A7APnHfOkYXib',

  telegram: {
    token: '5867549223:AAH2EZQ68vAovxV75TjZB6Vua4lOOx9B1PM',
    d2eChannelId: process.env.TELEGRAM_D2E_CHANNEL_ID || '-815776309',
  },

  schedule: {
    syncUsersTimeInMinute:
      process.env.SCHEDULE_SYNC_USERS_TIME_IN_MINUTE || '1',
  },

  cnvLoyalty: {
    clientId: process.env.CNV_LOYALTY_CLIENT_ID,
    clientSecret: process.env.CNV_LOYALTY_CLIENT_SECRET,
    serverUri: 'https://id.cnv.vn',
    token: process.env.CNV_LOYALTY_TOKEN,
  },

  nftScan: {
    apiKey: process.env.NFTSCAN_API_KEY,
  },

  woocommerce: {
    baseUrl: process.env.WOOCOMMERCE_BASE_URL,
    clientKey: process.env.WOOCOMMERCE_CLIENT_KEY,
    clientSecret: process.env.WOOCOMMERCE_CLIENT_SECRET,
  },
};
