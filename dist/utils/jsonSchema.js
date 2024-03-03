"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToJSONSchema = exports.json = void 0;
const zod_1 = require("zod");
const literalSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]);
const jsonSchema = zod_1.z.lazy(() => zod_1.z.union([literalSchema, zod_1.z.array(jsonSchema), zod_1.z.record(jsonSchema)]));
/**
zu.json() is a schema that validates that a JavaScript object is JSON-compatible. This includes `string`, `number`, `boolean`, and `null`, plus `Array`s and `Object`s containing JSON-compatible types as values.
Note: `JSON.stringify()` enforces non-circularity, but this can't be easily checked without actually stringifying the results, which can be slow.
@example
import { zu } from 'zod_utilz'
const schema = zu.json()
schema.parse( false ) // false
schema.parse( 8675309 ) // 8675309
schema.parse( { a: 'deeply', nested: [ 'JSON', 'object' ] } )
// { a: 'deeply', nested: [ 'JSON', 'object' ] }
*/
const json = () => jsonSchema;
exports.json = json;
exports.stringToJSONSchema = zod_1.z
    .string()
    .transform((str, ctx) => {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" });
        return zod_1.z.NEVER;
    }
});
//# sourceMappingURL=jsonSchema.js.map