import { z } from "zod";
import { commonValidations } from "../../utils/commonValidation";
import { json, stringToJSONSchema } from "../../utils/jsonSchema";

export type FormResponse = z.infer<typeof FormResponseSchema>;
export const FormResponseSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      value: z.string(),
    })
  ),
  calculations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      value: z.string(),
    })
  ),
  urlParameters: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      value: z.string(),
    })
  ),
  quiz: z
    .object({
      score: z.number(),
      maxScore: z.number(),
    })
    .optional(),
  submissionsId: z.string(),
  submissionTime: z.string(),
});

export type PaginatedFormResponse = z.infer<typeof PaginatedFormResponseSchema>;
export const PaginatedFormResponseSchema = z.object({
  responses: z.array(FormResponseSchema),
  totalResponses: z.number(),
  pageCount: z.number(),
});

export const GetFormFilterSchema = z.object({
  id: z.string(),
  condition: z.enum(["equals", "does_not_equal", "greater_than", "less_than"]),
  value: z.string().or(z.number()),
});

export const GetFormSchemaQueryParameters = z.object({
  limit: z
    .string()
    .refine((data) => !isNaN(Number(data)), "limit must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "limit must be a positive number")
    .optional(),
  afterDate: z.coerce.date().optional(),
  beforeDate: z.coerce.date().optional(),
  offset: z
    .string()
    .refine((data) => !isNaN(Number(data)), "offset must be a numeric value")
    .transform(Number)
    .refine((num) => num >= 0, "offset must be a non negative number")
    .optional(),
  status: z.enum(["in_progress", "finished"]).optional(),
  includeEditLink: z.boolean().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  filters: stringToJSONSchema.pipe(z.array(GetFormFilterSchema)).optional(),
});
export type GetFormQueryParameters = z.infer<
  typeof GetFormSchemaQueryParameters
>;

export const GetFormSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  query: GetFormSchemaQueryParameters.optional(),
});
