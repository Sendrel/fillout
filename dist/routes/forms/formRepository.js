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
exports.formRepository = void 0;
const filloutRestApiHelper_1 = require("../../utils/filloutRestApiHelper");
exports.formRepository = {
    findById: (id, queryParameters) => __awaiter(void 0, void 0, void 0, function* () {
        const form = yield (0, filloutRestApiHelper_1.fetchFilloutForm)(id, queryParameters);
        if ((queryParameters === null || queryParameters === void 0 ? void 0 : queryParameters.filters) && form) {
            const filters = JSON.parse(queryParameters.filters);
            const newFormResponses = form === null || form === void 0 ? void 0 : form.responses.filter((response) => {
                return filters === null || filters === void 0 ? void 0 : filters.every((filter) => {
                    const question = response.questions.find((q) => q.id === filter.id);
                    if (question === undefined) {
                        return false;
                    }
                    let questionValue = question.value;
                    let filterValue = filter.value;
                    if (question.type.toLowerCase().includes("date")) {
                        questionValue = new Date(question.value).getTime();
                        filterValue = new Date(filter.value).getTime();
                    }
                    else if (question.type.toLowerCase().includes("number")) {
                        questionValue = Number(question.value);
                        filterValue = Number(filter.value);
                    }
                    switch (filter.condition) {
                        case "equals":
                            return questionValue === filterValue;
                        case "does_not_equal":
                            return questionValue !== filterValue;
                        case "greater_than":
                            return questionValue > filterValue;
                        case "less_than":
                            return questionValue < filterValue;
                    }
                });
            });
            form.responses = newFormResponses;
            form.totalResponses = newFormResponses.length;
        }
        return form;
    }),
};
//# sourceMappingURL=formRepository.js.map