/// <amd-module name="tsickle/src/tsickle" />
import * as googmodule from './googmodule';
import { ModulesManifest } from './modules_manifest';
import { SourceMapper } from './source_map_utils';
import * as ts from './typescript';
export { FileMap, ModulesManifest } from './modules_manifest';
export interface AnnotatorHost {
    /**
     * If provided a function that logs an internal warning.
     * These warnings are not actionable by an end user and should be hidden
     * by default.
     */
    logWarning?: (warning: ts.Diagnostic) => void;
    pathToModuleName: (context: string, importPath: string) => string;
    /**
     * If true, convert every type to the Closure {?} type, which means
     * "don't check types".
     */
    untyped?: boolean;
    /** If provided, a set of paths whose types should always generate as {?}. */
    typeBlackListPaths?: Set<string>;
    /**
     * Convert shorthand "/index" imports to full path (include the "/index").
     * Annotation will be slower because every import must be resolved.
     */
    convertIndexImportShorthand?: boolean;
    /**
     * If true, do not modify quotes around property accessors.
     */
    disableAutoQuoting?: boolean;
}
/**
 * The header to be used in generated externs.  This is not included in the
 * output of annotate() because annotate() works one file at a time, and
 * typically you create one externs file from the entire compilation unit.
 */
export declare const EXTERNS_HEADER = "/**\n * @externs\n * @suppress {duplicate,checkTypes}\n */\n// NOTE: generated by tsickle, do not edit.\n";
/**
 * Symbols that are already declared as externs in Closure, that should
 * be avoided by tsickle's "declare ..." => externs.js conversion.
 */
export declare let closureExternsBlacklist: string[];
export declare function formatDiagnostics(diags: ReadonlyArray<ts.Diagnostic>): string;
/** Returns a fileName:line:column string for the given position in the file. */
export declare function formatLocation(sf: ts.SourceFile, start: number | undefined): string;
export declare function annotate(typeChecker: ts.TypeChecker, file: ts.SourceFile, host: AnnotatorHost, tsHost: ts.ModuleResolutionHost, tsOpts: ts.CompilerOptions, sourceMapper?: SourceMapper): {
    output: string;
    diagnostics: ts.Diagnostic[];
};
export declare function writeExterns(typeChecker: ts.TypeChecker, file: ts.SourceFile, host: AnnotatorHost): {
    output: string;
    diagnostics: ts.Diagnostic[];
};
/** Concatenate all generated externs definitions together into a string. */
export declare function getGeneratedExterns(externs: {
    [fileName: string]: string;
}): string;
export interface TsickleHost extends googmodule.GoogModuleProcessorHost, AnnotatorHost {
    /**
     * Whether to downlevel decorators
     */
    transformDecorators?: boolean;
    /**
     * Whether to convers types to closure
     */
    transformTypesToClosure?: boolean;
    /**
     * Whether to add aliases to the .d.ts files to add the exports to the
     * ಠ_ಠ.clutz namespace.
     */
    addDtsClutzAliases?: boolean;
    /**
     * If true, tsickle and decorator downlevel processing will be skipped for
     * that file.
     */
    shouldSkipTsickleProcessing(fileName: string): boolean;
    /**
     * Tsickle treats warnings as errors, if true, ignore warnings.  This might be
     * useful for e.g. third party code.
     */
    shouldIgnoreWarningsForPath(filePath: string): boolean;
    /** Whether to convert CommonJS require() imports to goog.module() and goog.require() calls. */
    googmodule: boolean;
}
export declare function mergeEmitResults(emitResults: EmitResult[]): EmitResult;
export interface EmitResult extends ts.EmitResult {
    modulesManifest: ModulesManifest;
    /**
     * externs.js files produced by tsickle, if any. module IDs are relative paths from
     * fileNameToModuleId.
     */
    externs: {
        [moduleId: string]: string;
    };
}
export interface EmitTransformers {
    beforeTsickle?: Array<ts.TransformerFactory<ts.SourceFile>>;
    beforeTs?: Array<ts.TransformerFactory<ts.SourceFile>>;
    afterTs?: Array<ts.TransformerFactory<ts.SourceFile>>;
}
export declare function emitWithTsickle(program: ts.Program, host: TsickleHost, tsHost: ts.CompilerHost, tsOptions: ts.CompilerOptions, targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: EmitTransformers): EmitResult;
