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
var graphql_1 = require("graphql");
var build_selection_set_1 = require("./build-selection-set");
var debugging_1 = require("../debugging");
var printer_1 = require("graphql/language/printer");
var get_directives_1 = require("../utils/get-directives");
function transformFragment(schema, fragment, overrideName) {
    debugging_1.debugLog("[transformFragment] transforming fragment " + fragment.name.value + " on type " + fragment.typeCondition.name.value);
    var root = graphql_1.typeFromAST(schema, fragment.typeCondition);
    var name = overrideName ? overrideName : fragment.name.value;
    var onType = fragment.typeCondition.name.value;
    var directives = get_directives_1.getDirectives(schema, fragment);
    var selectionSet = build_selection_set_1.buildSelectionSet(schema, root, fragment.selectionSet);
    return __assign({ name: name,
        onType: onType,
        selectionSet: selectionSet, document: printer_1.print(fragment), directives: directives, usesDirectives: Object.keys(directives).length > 0 }, build_selection_set_1.separateSelectionSet(selectionSet));
}
exports.transformFragment = transformFragment;
//# sourceMappingURL=transform-fragment-document.js.map