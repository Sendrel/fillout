"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.handleServiceResponse = void 0;
const serviceResponses_1 = require("./serviceResponses");
const handleServiceResponse = (serviceResponse, response) => {
    return response.status(serviceResponse.statusCode).send(serviceResponse);
};
exports.handleServiceResponse = handleServiceResponse;
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body, query: req.query, params: req.params });
        next();
    }
    catch (err) {
        const errorMessage = `Invalid input: ${err.errors
            .map((e) => `${e.message} ${e.path.slice(1).join(".")}`)
            .join(", ")}`;
        const statusCode = 400;
        res
            .status(statusCode)
            .send(new serviceResponses_1.ServiceResponse(serviceResponses_1.ResponseStatus.Failed, errorMessage, null, statusCode));
    }
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=httpHandlers.js.map