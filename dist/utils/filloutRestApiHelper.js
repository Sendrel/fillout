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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFilloutForm = void 0;
const qs_1 = __importDefault(require("qs"));
const FILLOUT_API_BASE_URL = "https://api.fillout.com/v1/api";
const fetchFilloutForm = (id, queryParameters) => __awaiter(void 0, void 0, void 0, function* () {
    const queryString = queryParameters
        ? `?${qs_1.default.stringify(queryParameters)}`
        : "";
    const response = yield fetch(`${FILLOUT_API_BASE_URL}/forms/${id}/submissions${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.FILLOUT_API_KEY,
        },
    });
    if (!response.ok) {
        return null;
    }
    return response.json();
});
exports.fetchFilloutForm = fetchFilloutForm;
//# sourceMappingURL=filloutRestApiHelper.js.map