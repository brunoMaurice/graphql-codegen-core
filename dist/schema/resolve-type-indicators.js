"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function resolveTypeIndicators(namedType) {
    var isEnum = namedType['getValues'] !== undefined;
    return {
        isType: namedType instanceof graphql_1.GraphQLObjectType,
        isScalar: namedType instanceof graphql_1.GraphQLScalarType,
        isInterface: namedType instanceof graphql_1.GraphQLInterfaceType,
        isUnion: namedType instanceof graphql_1.GraphQLUnionType,
        isInputType: namedType instanceof graphql_1.GraphQLInputObjectType,
        isEnum: namedType instanceof graphql_1.GraphQLEnumType
    };
}
exports.resolveTypeIndicators = resolveTypeIndicators;
//# sourceMappingURL=resolve-type-indicators.js.map