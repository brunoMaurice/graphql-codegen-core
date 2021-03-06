"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var resolve_type_1 = require("./resolve-type");
var resolve_type_indicators_1 = require("./resolve-type-indicators");
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
function resolveArguments(schema, args) {
    return args.map(function (arg) {
        var type = resolve_type_1.resolveType(arg.type);
        var namedType = graphql_1.getNamedType(arg.type);
        var indicators = resolve_type_indicators_1.resolveTypeIndicators(namedType);
        var directives = get_directives_1.getDirectives(schema, arg);
        debugging_1.debugLog("[resolveArguments] resolving argument " + arg.name + " of type " + type.name + "...");
        return {
            name: arg.name,
            description: arg.description || '',
            type: type.name,
            isRequired: type.isRequired,
            raw: type.raw,
            isNullableArray: type.isNullableArray,
            isArray: type.isArray,
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
exports.resolveArguments = resolveArguments;
//# sourceMappingURL=resolve-arguments.js.map