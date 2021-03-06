"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var resolve_type_1 = require("../schema/resolve-type");
var debugging_1 = require("../debugging");
var resolve_type_indicators_1 = require("../schema/resolve-type-indicators");
function transformVariables(schema, definitionNode) {
    return definitionNode.variableDefinitions.map(function (variableDefinition) {
        var typeFromSchema = graphql_1.typeFromAST(schema, variableDefinition.type);
        var resolvedType = resolve_type_1.resolveType(typeFromSchema);
        debugging_1.debugLog("[transformVariables] transforming variable " + variableDefinition.variable.name.value + " of type " + resolvedType.name);
        var namedType = graphql_1.getNamedType(typeFromSchema);
        var indicators = resolve_type_indicators_1.resolveTypeIndicators(namedType);
        return {
            name: variableDefinition.variable.name.value,
            type: resolvedType.name,
            raw: resolvedType.raw,
            isNullableArray: resolvedType.isNullableArray,
            isArray: resolvedType.isArray,
            isRequired: resolvedType.isRequired,
            isEnum: indicators.isEnum,
            isScalar: indicators.isScalar,
            isInterface: indicators.isInterface,
            isUnion: indicators.isUnion,
            isInputType: indicators.isInputType,
            isType: indicators.isType
        };
    });
}
exports.transformVariables = transformVariables;
//# sourceMappingURL=transform-variables.js.map