export const genericErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  //   console.error(message);
  res.status(statusCode).json({
    success: false,
    message,
  });
};
