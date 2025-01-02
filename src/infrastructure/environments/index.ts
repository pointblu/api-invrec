export const setEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envFilePath = `.env.${nodeEnv}`;
  return envFilePath;
};
