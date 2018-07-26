"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var debugging_1 = require("../debugging");
function isRequired(type) {
    var stringType = String(type);
    return stringType.lastIndexOf('!') === stringType.length - 1;
}
exports.isRequired = isRequired;
function isNullable(type) {
    var stringType = String(type);
    return isArray(type) && !stringType.includes('!]');
}
exports.isNullable = isNullable;
function isArray(type) {
    return String(type).indexOf('[') > -1;
}
exports.isArray = isArray;
function resolveType(type) {
    var name = graphql_1.getNamedType(type).name;
    debugging_1.debugLog("[resolveType] resolving type " + name);
    return {
        name: name,
        raw: String(type),
        isRequired: isRequired(type),
        isArray: isArray(type),
        isNullableArray: isNullable(type)
    };
}
exports.resolveType = resolveType;
//# sourceMappingURL=resolve-type.js.map