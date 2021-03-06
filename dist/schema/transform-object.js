"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var transform_fields_1 = require("./transform-fields");
var debugging_1 = require("../debugging");
var get_directives_1 = require("../utils/get-directives");
function transformGraphQLObject(schema, object) {
    debugging_1.debugLog("[transformGraphQLObject] transforming type " + object.name);
    var resolvedFields = transform_fields_1.resolveFields(schema, object.getFields());
    var resolvedInterfaces = object instanceof graphql_1.GraphQLObjectType ? object.getInterfaces().map(function (inf) { return inf.name; }) : [];
    var directives = get_directives_1.getDirectives(schema, object);
    return {
        name: object.name,
        description: object.description || '',
        fields: resolvedFields,
        interfaces: resolvedInterfaces,
        isInputType: object instanceof graphql_1.GraphQLInputObjectType,
        hasFields: resolvedFields.length > 0,
        hasInterfaces: resolvedInterfaces.length > 0,
        directives: directives,
        usesDirectives: Object.keys(directives).length > 0
    };
}
exports.transformGraphQLObject = transformGraphQLObject;
//# sourceMappingURL=transform-object.js.map