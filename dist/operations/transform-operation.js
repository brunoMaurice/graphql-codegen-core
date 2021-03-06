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
var get_root_1 = require("../utils/get-root");
var build_selection_set_1 = require("./build-selection-set");
var transform_variables_1 = require("./transform-variables");
var debugging_1 = require("../debugging");
var printer_1 = require("graphql/language/printer");
var get_directives_1 = require("../utils/get-directives");
function transformOperation(schema, operationNode, overrideName) {
    var name = overrideName ? overrideName : operationNode.name && operationNode.name.value ? operationNode.name.value : '';
    debugging_1.debugLog("[transformOperation] transforming operation " + name + " of type " + operationNode.operation);
    var root = get_root_1.getRoot(schema, operationNode);
    if (!root) {
        throw new Error("Unable to find the schema root matching: " + operationNode.operation);
    }
    var variables = transform_variables_1.transformVariables(schema, operationNode);
    var directives = get_directives_1.getDirectives(schema, operationNode);
    var selectionSet = build_selection_set_1.buildSelectionSet(schema, root, operationNode.selectionSet);
    return __assign({ name: name,
        selectionSet: selectionSet, operationType: operationNode.operation, variables: variables, hasVariables: variables.length > 0, isQuery: operationNode.operation === 'query', isMutation: operationNode.operation === 'mutation', isSubscription: operationNode.operation === 'subscription', document: printer_1.print(operationNode), directives: directives, usesDirectives: Object.keys(directives).length > 0 }, build_selection_set_1.separateSelectionSet(selectionSet));
}
exports.transformOperation = transformOperation;
//# sourceMappingURL=transform-operation.js.map