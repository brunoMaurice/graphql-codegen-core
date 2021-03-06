"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transform_fields_1 = require("./transform-fields");
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
var implementing_types_1 = require("./implementing-types");
function transformInterface(schema, gqlInterface) {
    debugging_1.debugLog("[transformInterface] transformed interface " + gqlInterface.name);
    var resolvedFields = transform_fields_1.resolveFields(schema, gqlInterface.getFields());
    var directives = get_directives_1.getDirectives(schema, gqlInterface);
    var implementingTypes = implementing_types_1.getImplementingTypes(gqlInterface.name, schema);
    return {
        name: gqlInterface.name,
        description: gqlInterface.description || '',
        fields: resolvedFields,
        hasFields: resolvedFields.length > 0,
        directives: directives,
        usesDirectives: Object.keys(directives).length > 0,
        implementingTypes: implementingTypes,
        hasImplementingTypes: implementingTypes.length > 0
    };
}
exports.transformInterface = transformInterface;
//# sourceMappingURL=transform-interface.js.map