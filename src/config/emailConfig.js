const baseUrl = (process.env.NODE_ENV === 'production')
  ? `https://${process.env.HOST}:${process.env.PORT}` : `http://${process.env.HOST}:${process.env.PORT}`;

export default baseUrl;
