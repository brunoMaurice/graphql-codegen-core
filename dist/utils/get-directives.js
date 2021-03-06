"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var values_1 = require("graphql/execution/values");
function getDirectives(schema, node) {
    var schemaDirectives = schema.getDirectives ? schema.getDirectives() : [];
    var astNode = node['astNode'];
    var result = {};
    if (astNode) {
        schemaDirectives.forEach(function (directive) {
            var directiveValue = values_1.getDirectiveValues(directive, astNode);
            if (directiveValue !== undefined) {
                result[directive.name] = directiveValue || {};
            }
        });
    }
    return result;
}
exports.getDirectives = getDirectives;
//# sourceMappingURL=get-directives.js.map