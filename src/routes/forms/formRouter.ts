import express, { Request, Response, Router } from "express";
import { z } from "zod";

import { GetFormQueryParameters, GetFormSchema } from "./formModel";
import {
  handleServiceResponse,
  validateRequest,
} from "../../utils/httpHandlers";
import { formService } from "./formService";
import { ResponseStatus, ServiceResponse } from "../../utils/serviceResponses";

export const formRouter: Router = (() => {
  const router = express.Router();

  router.get(
    "/:id/filteredResponses",
    validateRequest(GetFormSchema),
    async (req: Request, res: Response) => {
      const serviceResponse = await formService.findById(
        req.params.id,
        req.query as GetFormQueryParameters
      );
      if (serviceResponse instanceof ServiceResponse) {
        return handleServiceResponse(serviceResponse, res);
      }

      return res.status(200).send(serviceResponse);
    }
  );

  router.get("/", async (req: Request, res: Response) => {
    handleServiceResponse(
      new ServiceResponse(ResponseStatus.Success, "Hello World", null, 500),
      res
    );
  });

  return router;
})();
