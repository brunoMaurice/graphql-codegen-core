"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var transform_fragment_document_1 = require("./transform-fragment-document");
var transform_operation_1 = require("./transform-operation");
var debugging_1 = require("../debugging");
var __1 = require("..");
var usedNames = {};
function nameGenerator(operationType, count) {
    if (count === void 0) { count = 1; }
    var idea = "Anonymous_" + operationType + "_" + count;
    if (usedNames[idea]) {
        return nameGenerator(operationType, count + 1);
    }
    usedNames[idea] = true;
    return idea;
}
function generateTempName(documentNode) {
    var operationType;
    if (documentNode.kind === graphql_1.Kind.FRAGMENT_DEFINITION) {
        operationType = 'fragment';
    }
    else if (documentNode.kind === graphql_1.Kind.OPERATION_DEFINITION) {
        operationType = documentNode.operation;
    }
    return nameGenerator(operationType);
}
function fixAnonymousDocument(documentNode) {
    if (!documentNode.name) {
        var newName = generateTempName(documentNode);
        __1.logger.warn("The following document does not have a name. The codegen will use an anonymous name: " + newName + ", please consider to name it.", graphql_1.print(documentNode));
        return newName;
    }
    return null;
}
exports.fixAnonymousDocument = fixAnonymousDocument;
function transformDocument(schema, documentNode) {
    var result = {
        fragments: [],
        operations: [],
        hasFragments: false,
        hasOperations: false
    };
    var definitions = documentNode.definitions || [];
    debugging_1.debugLog("[transformDocument] transforming total of " + definitions.length + " definitions...");
    definitions.forEach(function (definitionNode) {
        if (definitionNode.kind === graphql_1.Kind.OPERATION_DEFINITION) {
            var overrideName = fixAnonymousDocument(definitionNode);
            result.operations.push(transform_operation_1.transformOperation(schema, definitionNode, overrideName));
        }
        else if (definitionNode.kind === graphql_1.Kind.FRAGMENT_DEFINITION) {
            var overrideName = fixAnonymousDocument(definitionNode);
            result.fragments.push(transform_fragment_document_1.transformFragment(schema, definitionNode, overrideName));
        }
        else {
            logger.warn(`It seems like you provided an invalid GraphQL document of kind "${definitionNode.kind}".`);
        }
    });
    result.hasFragments = result.fragments.length > 0;
    result.hasOperations = result.operations.length > 0;
    return result;
}
exports.transformDocument = transformDocument;
//# sourceMappingURL=transform-document.js.map
