"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unexpectedRequest = (_req, res) => {
    res.sendStatus(404);
};
const addErrorToRequestLog = (err, _req, res, next) => {
    res.locals.err = err;
    next(err);
};
const defaultErrorRequestHandler = (_err, _req, res) => {
    res.sendStatus(505);
};
exports.default = () => [
    unexpectedRequest,
    addErrorToRequestLog,
    defaultErrorRequestHandler,
];
//# sourceMappingURL=errorHandler.js.map