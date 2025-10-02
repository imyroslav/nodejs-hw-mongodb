import { HttpError } from "http-errors";

// Error middleware
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
    
    res.status(500).json({
        status: 500,
        message: "Something went wrong on server side",
        data: err.message,
    });
    next();
};