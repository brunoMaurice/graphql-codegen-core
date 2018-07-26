"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var object_map_to_array_1 = require("../utils/object-map-to-array");
var resolve_type_1 = require("./resolve-type");
var resolve_arguments_1 = require("./resolve-arguments");
var resolve_type_indicators_1 = require("./resolve-type-indicators");
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
function resolveFields(schema, rawFields) {
    var fieldsArray = object_map_to_array_1.objectMapToArray(rawFields);
    return fieldsArray.map(function (item) {
        var type = resolve_type_1.resolveType(item.value.type);
        var resolvedArguments = resolve_arguments_1.resolveArguments(schema, item.value.args || []);
        var namedType = graphql_1.getNamedType(item.value.type);
        var indicators = resolve_type_indicators_1.resolveTypeIndicators(namedType);
        var directives = get_directives_1.getDirectives(schema, item.value);
        debugging_1.debugLog("[resolveFields] transformed field " + item.value.name + " of type " + type + ", resolved type is: ", type);
        return {
            name: item.value.name,
            description: item.value.description || '',
            arguments: resolvedArguments,
            type: type.name,
            raw: type.raw,
            isNullableArray: type.isNullableArray,
            isArray: type.isArray,
            isRequired: type.isRequired,
            hasArguments: resolvedArguments.length > 0,
            isEnum: indicators.isEnum,
            isScalar: indicators.isScalar,
            isInterface: indicators.isInterface,
            isUnion: indicators.isUnion,
            isInputType: indicators.isInputType,
            isType: indicators.isType,
            directives: directives,
            usesDirectives: Object.keys(directives).length > 0
        };
    });
}
exports.resolveFields = resolveFields;
//# sourceMappingURL=transform-fields.js.map