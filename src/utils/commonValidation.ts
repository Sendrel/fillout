import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine(
      (data) => data?.length && data.length > 5,
      "ID must be at least 5 characters long"
    ),
};
