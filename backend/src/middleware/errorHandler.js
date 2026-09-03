export function notFoundHandler(req, res) {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
}
