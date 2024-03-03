"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonValidations = void 0;
const zod_1 = require("zod");
exports.commonValidations = {
    id: zod_1.z
        .string()
        .refine((data) => (data === null || data === void 0 ? void 0 : data.length) && data.length > 5, "ID must be at least 5 characters long"),
};
//# sourceMappingURL=commonValidation.js.map