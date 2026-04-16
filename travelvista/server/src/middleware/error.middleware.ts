import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(`[ERROR] ${err.message}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: (err as any).errors,
    });
    return;
  }

  // SQLite constraint errors
  if (err.message?.includes('UNIQUE constraint failed')) {
    res.status(409).json({
      success: false,
      error: 'Resource already exists.',
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
}
