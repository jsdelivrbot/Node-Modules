/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { COMPILER_OPTIONS, Compiler, CompilerFactory, ModuleWithComponentFactories } from './linker/compiler';
export { ComponentFactory, ComponentRef } from './linker/component_factory';
export { ComponentFactoryResolver } from './linker/component_factory_resolver';
export { ElementRef } from './linker/element_ref';
export { NgModuleFactory, NgModuleRef } from './linker/ng_module_factory';
export { NgModuleFactoryLoader, getModuleFactory } from './linker/ng_module_factory_loader';
export { QueryList } from './linker/query_list';
export { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig } from './linker/system_js_ng_module_factory_loader';
export { TemplateRef } from './linker/template_ref';
export { ViewContainerRef } from './linker/view_container_ref';
export { EmbeddedViewRef, ViewRef } from './linker/view_ref';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQW1CLDRCQUE0QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0gsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFFLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqSCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gUHVibGljIEFQSSBmb3IgY29tcGlsZXJcbmV4cG9ydCB7Q09NUElMRVJfT1BUSU9OUywgQ29tcGlsZXIsIENvbXBpbGVyRmFjdG9yeSwgQ29tcGlsZXJPcHRpb25zLCBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzfSBmcm9tICcuL2xpbmtlci9jb21waWxlcic7XG5leHBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZn0gZnJvbSAnLi9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnknO1xuZXhwb3J0IHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcbmV4cG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi9saW5rZXIvZWxlbWVudF9yZWYnO1xuZXhwb3J0IHtOZ01vZHVsZUZhY3RvcnksIE5nTW9kdWxlUmVmfSBmcm9tICcuL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeSc7XG5leHBvcnQge05nTW9kdWxlRmFjdG9yeUxvYWRlciwgZ2V0TW9kdWxlRmFjdG9yeX0gZnJvbSAnLi9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnlfbG9hZGVyJztcbmV4cG9ydCB7UXVlcnlMaXN0fSBmcm9tICcuL2xpbmtlci9xdWVyeV9saXN0JztcbmV4cG9ydCB7U3lzdGVtSnNOZ01vZHVsZUxvYWRlciwgU3lzdGVtSnNOZ01vZHVsZUxvYWRlckNvbmZpZ30gZnJvbSAnLi9saW5rZXIvc3lzdGVtX2pzX25nX21vZHVsZV9mYWN0b3J5X2xvYWRlcic7XG5leHBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICcuL2xpbmtlci90ZW1wbGF0ZV9yZWYnO1xuZXhwb3J0IHtWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuZXhwb3J0IHtFbWJlZGRlZFZpZXdSZWYsIFZpZXdSZWZ9IGZyb20gJy4vbGlua2VyL3ZpZXdfcmVmJztcbiJdfQ==