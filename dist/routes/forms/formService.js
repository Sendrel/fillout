"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formService = void 0;
const serviceResponses_1 = require("../../utils/serviceResponses");
const formRepository_1 = require("./formRepository");
exports.formService = {
    // Retrieves a single form by their ID
    findById: (id, queryParameters) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const paginatedFormResponse = yield formRepository_1.formRepository.findById(id, queryParameters);
            if (!paginatedFormResponse) {
                return new serviceResponses_1.ServiceResponse(serviceResponses_1.ResponseStatus.Failed, "Form not found", null, 404);
            }
            return paginatedFormResponse;
        }
        catch (ex) {
            const errorMessage = `Error finding form with id ${id}:, ${ex.message}`;
            return new serviceResponses_1.ServiceResponse(serviceResponses_1.ResponseStatus.Failed, errorMessage, null, 500);
        }
    }),
};
//# sourceMappingURL=formService.js.map