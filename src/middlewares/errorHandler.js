import { isHttpError } from "http-errors";

// Error middleware
export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }
    
    res.status(500).json({
        status: 500,
        message: "Something went wrong on server side",
        data: err.message,
    });
    next();
};