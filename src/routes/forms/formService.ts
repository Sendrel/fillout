import { ResponseStatus, ServiceResponse } from "../../utils/serviceResponses";
import {
  FormResponse,
  GetFormQueryParameters,
  PaginatedFormResponse,
} from "./formModel";
import { formRepository } from "./formRepository";

export const formService = {
  // Retrieves a single form by their ID
  findById: async (
    id: string,
    queryParameters?: GetFormQueryParameters
  ): Promise<ServiceResponse<null> | PaginatedFormResponse> => {
    try {
      const paginatedFormResponse = await formRepository.findById(
        id,
        queryParameters
      );
      if (!paginatedFormResponse) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Form not found",
          null,
          404
        );
      }

      return paginatedFormResponse;
    } catch (ex) {
      const errorMessage = `Error finding form with id ${id}:, ${
        (ex as Error).message
      }`;

      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        500
      );
    }
  },
};
