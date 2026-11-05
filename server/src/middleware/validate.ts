import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((e) => e.message);
        res.status(400).json({
          success: false,
          error: errorMessages[0] || "Invalid request payload",
          details: errorMessages,
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: "Validation error occurred.",
      });
    }
  };
}
