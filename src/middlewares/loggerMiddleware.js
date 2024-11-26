const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(
    `Incoming Request -> [${timestamp}] ${req.method} ${req.originalUrl}`,
  );
  next();
};

module.exports = loggerMiddleware;
