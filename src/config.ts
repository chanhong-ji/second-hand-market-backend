import 'dotenv/config';

function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`envError : Key '${key}' is undefined`);
  }
  return value;
}

const config = {
  host: {
    port: required('PORT'),
  },
  jwt: {
    secretKey: required('PRIVATE_KEY'),
    expiresInSec: required('JWT_EXPIRES_IN_SEC', 60 * 60 * 24 * 2),
  },
  aws: {
    key: required('AWS_KEY'),
    secretKey: required('AWS_SECRET'),
  },
  db: {
    url: required('DATABASE_URL'),
  },
};

export default config;
