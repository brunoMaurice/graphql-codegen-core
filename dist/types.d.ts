import { GraphQLSchema } from 'graphql';
export interface AstNode {
    directives: DirectiveUseMap;
    usesDirectives: boolean;
}
export interface Argument extends AstNode {
    raw: string;
    name: string;
    description: string;
    type: string;
    isRequired: boolean;
    isArray: boolean;
    isNullableArray: boolean;
    isType: boolean;
    isScalar: boolean;
    isInterface: boolean;
    isUnion: boolean;
    isInputType: boolean;
    isEnum: boolean;
}
export interface Field extends AstNode {
    name: string;
    description: string;
    arguments: Argument[];
    type: string;
    raw: string;
    isArray: boolean;
    isRequired: boolean;
    isNullableArray: boolean;
    hasArguments: boolean;
    isType: boolean;
    isScalar: boolean;
    isInterface: boolean;
    isUnion: boolean;
    isInputType: boolean;
    isEnum: boolean;
}
export interface Type extends AstNode {
    fields: Field[];
    description: string;
    name: string;
    isInputType: boolean;
    interfaces: string[];
    hasFields: boolean;
    hasInterfaces: boolean;
}
export interface Scalar extends AstNode {
    name: string;
    description: string;
}
export interface Enum extends AstNode {
    name: string;
    description: string;
    values: EnumValue[];
}
export interface EnumValue extends AstNode {
    name: string;
    value: string;
    description: string;
}
export interface Union extends AstNode {
    name: string;
    description: string;
    possibleTypes: string[];
}
export interface Interface extends AstNode {
    name: string;
    description: string;
    fields: Field[];
    hasFields: boolean;
    implementingTypes: string[];
    hasImplementingTypes: boolean;
}
export interface SchemaTemplateContext extends AstNode {
    types: Type[];
    inputTypes: Type[];
    enums: Enum[];
    unions: Union[];
    interfaces: Interface[];
    scalars: Scalar[];
    definedDirectives: Directive[];
    hasTypes: boolean;
    hasInputTypes: boolean;
    hasEnums: boolean;
    hasUnions: boolean;
    hasScalars: boolean;
    hasInterfaces: boolean;
    hasDefinedDirectives: boolean;
    rawSchema: GraphQLSchema;
}
export interface SelectionSetItem extends AstNode {
    isFragmentSpread: boolean;
    isInlineFragment: boolean;
    isField: boolean;
    isLeaf: boolean;
}
export interface SelectionSetInlineFragment extends SelectionSetItem {
    selectionSet: SelectionSetItem[];
    onType: string;
    fields: SelectionSetFieldNode[];
    fragmentsSpread: SelectionSetFragmentSpread[];
    inlineFragments: SelectionSetInlineFragment[];
    hasFragmentsSpread: boolean;
    hasInlineFragments: boolean;
    hasFields: boolean;
}
export interface SelectionSetFragmentSpread extends SelectionSetItem {
    fragmentName: string;
}
export interface SelectionSetFieldNode extends SelectionSetItem {
    selectionSet: SelectionSetItem[];
    name: string;
    type: string;
    isRequired: boolean;
    isArray: boolean;
    isNullableArray: boolean;
    raw: string;
    fields: SelectionSetFieldNode[];
    fragmentsSpread: SelectionSetFragmentSpread[];
    inlineFragments: SelectionSetInlineFragment[];
    hasFragmentsSpread: boolean;
    hasInlineFragments: boolean;
    hasFields: boolean;
    isType: boolean;
    isScalar: boolean;
    isInterface: boolean;
    isUnion: boolean;
    isInputType: boolean;
    isEnum: boolean;
}
export declare function isFieldNode(node: SelectionSetItem): node is SelectionSetFieldNode;
export declare function isFragmentSpreadNode(node: SelectionSetItem): node is SelectionSetFragmentSpread;
export declare function isInlineFragmentNode(node: SelectionSetItem): node is SelectionSetInlineFragment;
export interface Fragment extends AstNode {
    name: string;
    selectionSet: SelectionSetItem[];
    onType: string;
    document: string;
    fields: SelectionSetFieldNode[];
    fragmentsSpread: SelectionSetFragmentSpread[];
    inlineFragments: SelectionSetInlineFragment[];
    hasFragmentsSpread: boolean;
    hasInlineFragments: boolean;
    hasFields: boolean;
}
export interface Operation extends AstNode {
    name: string;
    selectionSet: SelectionSetItem[];
    operationType: string;
    variables: Variable[];
    hasVariables: boolean;
    isQuery: boolean;
    isMutation: boolean;
    isSubscription: boolean;
    document: string;
    fields: SelectionSetFieldNode[];
    fragmentsSpread: SelectionSetFragmentSpread[];
    inlineFragments: SelectionSetInlineFragment[];
    hasFragmentsSpread: boolean;
    hasInlineFragments: boolean;
    hasFields: boolean;
}
export interface Variable {
    name: string;
    type: string;
    isRequired: boolean;
    isArray: boolean;
    isNullableArray: boolean;
    raw: string;
    isType: boolean;
    isScalar: boolean;
    isInterface: boolean;
    isUnion: boolean;
    isInputType: boolean;
    isEnum: boolean;
}
export interface Document {
    fragments: Fragment[];
    operations: Operation[];
    hasFragments: boolean;
    hasOperations: boolean;
}
export declare type DirectiveUseMap = {
    [key: string]: any;
};
export interface Directive {
    name: string;
    description: string;
    locations: string[];
    arguments: Argument[];
    hasArguments: boolean;
    onFragmentSpread: boolean;
    onInlineFragment: boolean;
    onQuery: boolean;
    onMutation: boolean;
    onSubscription: boolean;
    onFragment: boolean;
    onField: boolean;
    onSchema: boolean;
    onScalar: boolean;
    onFieldDefinition: boolean;
    onEnum: boolean;
    onEnumValue: boolean;
    onObject: boolean;
    onInputObject: boolean;
    onInputField: boolean;
    onArgument: boolean;
    onInterface: boolean;
    onUnion: boolean;
}
export declare const EInputType: {
    SINGLE_FILE: string;
    MULTIPLE_FILES: string;
    PROJECT: string;
};
export interface GeneratorConfig {
    inputType: string;
    flattenTypes: boolean;
    config?: {
        [configName: string]: any;
    };
    templates: {
        [templateName: string]: string | string[];
    } | string;
    primitives: {
        String: string;
        Int: string;
        Float: string;
        Boolean: string;
        ID: string;
    };
    outFile?: string;
    filesExtension?: string;
    customHelpers?: {
        [helperName: string]: Function;
    };
    deprecationNote?: string;
}
export interface FileOutput {
    filename: string;
    content: string;
}
export interface Settings {
    generateSchema?: boolean;
    generateDocuments?: boolean;
    verbose?: boolean;
}
export declare type CustomProcessingFunction = (templateContext: SchemaTemplateContext, mergedDocuments: Document, settings: any) => FileOutput[] | Promise<FileOutput[]>;
export declare function isCustomProcessingFunction(config: GeneratorConfig | CustomProcessingFunction): config is CustomProcessingFunction;
export declare function isGeneratorConfig(config: GeneratorConfig | CustomProcessingFunction): config is GeneratorConfig;
