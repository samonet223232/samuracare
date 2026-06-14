export const config = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'samuracare',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  PORT: parseInt(process.env.PORT || '8080', 10),
  JWT_SECRET: process.env.JWT_SECRET || 'samuracare-jwt-secret-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
};