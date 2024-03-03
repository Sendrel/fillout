import { NextFunction, Request, Response } from "express";

import { ZodError, ZodSchema } from "zod";
import { ResponseStatus, ServiceResponse } from "./serviceResponses";

export const handleServiceResponse = (
  serviceResponse: any,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors
        .map((e) => `${e.message} ${e.path.slice(1).join(".")}`)
        .join(", ")}`;
      const statusCode = 400;
      res
        .status(statusCode)
        .send(
          new ServiceResponse<null>(
            ResponseStatus.Failed,
            errorMessage,
            null,
            statusCode
          )
        );
    }
  };
