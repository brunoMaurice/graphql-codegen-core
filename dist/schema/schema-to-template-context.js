"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var object_map_to_array_1 = require("../utils/object-map-to-array");
var transform_object_1 = require("./transform-object");
var transform_enum_1 = require("./transform-enum");
var transform_union_1 = require("./transform-union");
var transform_interface_1 = require("./transform-interface");
var transform_scalar_1 = require("./transform-scalar");
var debugging_1 = require("../debugging");
var transform_directives_1 = require("./transform-directives");
var get_directives_1 = require("../utils/get-directives");
var GRAPHQL_PRIMITIVES = ['String', 'Int', 'Boolean', 'ID', 'Float'];
var clearTypes = function (typesMap) {
    return Object.keys(typesMap)
        .filter(function (key) { return !GRAPHQL_PRIMITIVES.includes(key) && !key.startsWith('__'); })
        .reduce(function (obj, key) {
        obj[key] = typesMap[key];
        return obj;
    }, {});
};
function schemaToTemplateContext(schema) {
    debugging_1.debugLog('[schemaToTemplateContext] started...');
    var directives = get_directives_1.getDirectives(schema, schema);
    var result = {
        types: [],
        inputTypes: [],
        enums: [],
        unions: [],
        scalars: [],
        interfaces: [],
        definedDirectives: [],
        // Indicators
        hasTypes: false,
        hasInputTypes: false,
        hasEnums: false,
        hasUnions: false,
        hasScalars: false,
        hasInterfaces: false,
        hasDefinedDirectives: false,
        rawSchema: schema,
        directives: directives,
        usesDirectives: Object.keys(directives).length > 0
    };
    var rawTypesMap = schema.getTypeMap();
    var typesMap = clearTypes(rawTypesMap);
    var typesArray = object_map_to_array_1.objectMapToArray(typesMap);
    debugging_1.debugLog("[schemaToTemplateContext] Got total of " + typesArray.length + " types in the GraphQL schema");
    typesArray.map(function (graphQlType) {
        var actualTypeDef = graphQlType.value;
        if (actualTypeDef instanceof graphql_1.GraphQLObjectType) {
            result.types.push(transform_object_1.transformGraphQLObject(schema, actualTypeDef));
        }
        else if (actualTypeDef instanceof graphql_1.GraphQLInputObjectType) {
            result.inputTypes.push(transform_object_1.transformGraphQLObject(schema, actualTypeDef));
        }
        else if (actualTypeDef instanceof graphql_1.GraphQLEnumType) {
            result.enums.push(transform_enum_1.transformGraphQLEnum(schema, actualTypeDef));
        }
        else if (actualTypeDef instanceof graphql_1.GraphQLUnionType) {
            result.unions.push(transform_union_1.transformUnion(schema, actualTypeDef));
        }
        else if (actualTypeDef instanceof graphql_1.GraphQLInterfaceType) {
            result.interfaces.push(transform_interface_1.transformInterface(schema, actualTypeDef));
        }
        else if (actualTypeDef instanceof graphql_1.GraphQLScalarType) {
            result.scalars.push(transform_scalar_1.transformScalar(schema, actualTypeDef));
        }
        else {
            throw new Error("Unexpected GraphQL type definition: " + graphQlType.key + " (As string: " + String(actualTypeDef) + ")."
                + "Please check that you are importing only one instance of the 'graphql' package.");
        }
    });
    result.definedDirectives = transform_directives_1.transformDirectives(schema, schema.getDirectives() || []);
    result.hasTypes = result.types.length > 0;
    result.hasInputTypes = result.inputTypes.length > 0;
    result.hasEnums = result.enums.length > 0;
    result.hasUnions = result.unions.length > 0;
    result.hasScalars = result.scalars.length > 0;
    result.hasInterfaces = result.interfaces.length > 0;
    result.hasDefinedDirectives = result.definedDirectives.length > 0;
    debugging_1.debugLog("[schemaToTemplateContext] done, results is: ", result);
    return result;
}
exports.schemaToTemplateContext = schemaToTemplateContext;
//# sourceMappingURL=schema-to-template-context.js.map