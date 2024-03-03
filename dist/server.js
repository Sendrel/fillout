"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const formRouter_1 = require("./routes/forms/formRouter");
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const app = (0, express_1.default)();
exports.app = app;
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use("/v1/api/forms", formRouter_1.formRouter);
app.use((0, errorHandler_1.default)());
//# sourceMappingURL=server.js.map