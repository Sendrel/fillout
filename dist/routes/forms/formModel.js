"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFormSchema = exports.GetFormSchemaQueryParameters = exports.GetFormFilterSchema = exports.PaginatedFormResponseSchema = exports.FormResponseSchema = void 0;
const zod_1 = require("zod");
const commonValidation_1 = require("../../utils/commonValidation");
const jsonSchema_1 = require("../../utils/jsonSchema");
exports.FormResponseSchema = zod_1.z.object({
    questions: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        value: zod_1.z.string(),
    })),
    calculations: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        value: zod_1.z.string(),
    })),
    urlParameters: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        value: zod_1.z.string(),
    })),
    quiz: zod_1.z
        .object({
        score: zod_1.z.number(),
        maxScore: zod_1.z.number(),
    })
        .optional(),
    submissionsId: zod_1.z.string(),
    submissionTime: zod_1.z.string(),
});
exports.PaginatedFormResponseSchema = zod_1.z.object({
    responses: zod_1.z.array(exports.FormResponseSchema),
    totalResponses: zod_1.z.number(),
    pageCount: zod_1.z.number(),
});
exports.GetFormFilterSchema = zod_1.z.object({
    id: zod_1.z.string(),
    condition: zod_1.z.enum(["equals", "does_not_equal", "greater_than", "less_than"]),
    value: zod_1.z.string().or(zod_1.z.number()),
});
exports.GetFormSchemaQueryParameters = zod_1.z.object({
    limit: zod_1.z
        .string()
        .refine((data) => !isNaN(Number(data)), "limit must be a numeric value")
        .transform(Number)
        .refine((num) => num > 0, "limit must be a positive number")
        .optional(),
    afterDate: zod_1.z.coerce.date().optional(),
    beforeDate: zod_1.z.coerce.date().optional(),
    offset: zod_1.z
        .string()
        .refine((data) => !isNaN(Number(data)), "offset must be a numeric value")
        .transform(Number)
        .refine((num) => num >= 0, "offset must be a non negative number")
        .optional(),
    status: zod_1.z.enum(["in_progress", "finished"]).optional(),
    includeEditLink: zod_1.z.boolean().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    filters: jsonSchema_1.stringToJSONSchema.pipe(zod_1.z.array(exports.GetFormFilterSchema)).optional(),
});
exports.GetFormSchema = zod_1.z.object({
    params: zod_1.z.object({ id: commonValidation_1.commonValidations.id }),
    query: exports.GetFormSchemaQueryParameters.optional(),
});
//# sourceMappingURL=formModel.js.map