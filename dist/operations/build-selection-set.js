"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var graphql_1 = require("graphql");
var get_field_def_1 = require("../utils/get-field-def");
var resolve_type_1 = require("../schema/resolve-type");
var debugging_1 = require("../debugging");
var resolve_type_indicators_1 = require("../schema/resolve-type-indicators");
function separateSelectionSet(selectionSet) {
    var fields = selectionSet.filter(function (n) { return types_1.isFieldNode(n); });
    var fragmentsSpread = selectionSet.filter(function (n) { return types_1.isFragmentSpreadNode(n); });
    var inlineFragments = selectionSet.filter(function (n) { return types_1.isInlineFragmentNode(n); });
    return {
        fragmentsSpread: fragmentsSpread,
        fields: fields,
        inlineFragments: inlineFragments,
        hasFragmentsSpread: fragmentsSpread.length > 0,
        hasFields: fields.length > 0,
        hasInlineFragments: inlineFragments.length > 0
    };
}
exports.separateSelectionSet = separateSelectionSet;
function buildSelectionSet(schema, rootObject, node) {
    return (node && node.selections ? node.selections : [])
        .map(function (selectionNode) {
        if (selectionNode.kind === graphql_1.Kind.FIELD) {
            var fieldNode = selectionNode;
            var name = fieldNode.alias && fieldNode.alias.value ? fieldNode.alias.value : fieldNode.name.value;
            debugging_1.debugLog("[buildSelectionSet] transforming FIELD with name " + name);
            var field = get_field_def_1.getFieldDef(rootObject, fieldNode);
            if (!field) {
                debugging_1.debugLog("[buildSelectionSet] Ignoring field because of null result from getFieldDef...");
                return null;
            }
            var resolvedType = resolve_type_1.resolveType(field.type);
            var childSelectionSet = buildSelectionSet(schema, graphql_1.getNamedType(field.type), fieldNode.selectionSet);
            var namedType = graphql_1.getNamedType(field.type);
            var indicators = resolve_type_indicators_1.resolveTypeIndicators(namedType);
            return __assign({ isField: true, isFragmentSpread: false, isInlineFragment: false, isLeaf: childSelectionSet.length === 0, name: name, selectionSet: childSelectionSet }, separateSelectionSet(childSelectionSet), { type: resolvedType.name, raw: resolvedType.raw, isRequired: resolvedType.isRequired, isNullableArray: resolvedType.isNullableArray, isArray: resolvedType.isArray, isEnum: indicators.isEnum, isScalar: indicators.isScalar, isInterface: indicators.isInterface, isUnion: indicators.isUnion, isInputType: indicators.isInputType, isType: indicators.isType });
        }
        else if (selectionNode.kind === graphql_1.Kind.FRAGMENT_SPREAD) {
            var fieldNode = selectionNode;
            debugging_1.debugLog("[buildSelectionSet] transforming FRAGMENT_SPREAD with name " + fieldNode.name.value + "...");
            return {
                isField: false,
                isFragmentSpread: true,
                isInlineFragment: false,
                isLeaf: true,
                fragmentName: fieldNode.name.value
            };
        }
        else if (selectionNode.kind === graphql_1.Kind.INLINE_FRAGMENT) {
            debugging_1.debugLog("[buildSelectionSet] transforming INLINE_FRAGMENT...");
            var fieldNode = selectionNode;
            var nextRoot = graphql_1.typeFromAST(schema, fieldNode.typeCondition);
            var childSelectionSet = buildSelectionSet(schema, nextRoot, fieldNode.selectionSet);
            return __assign({ isField: false, isFragmentSpread: false, isInlineFragment: true, isLeaf: childSelectionSet.length === 0, selectionSet: childSelectionSet }, separateSelectionSet(childSelectionSet), { onType: fieldNode.typeCondition.name.value });
        }
        else {
            throw new Error("Unexpected GraphQL type: " + selectionNode.kind + "!");
        }
    })
        .filter(function (item) { return item; }); // filter to remove null types
}
exports.buildSelectionSet = buildSelectionSet;
//# sourceMappingURL=build-selection-set.js.map