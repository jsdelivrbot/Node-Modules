/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { identifierName } from '../compile_metadata';
import * as o from '../output/output_ast';
import { error } from '../util';
import { Identifiers as R3 } from './r3_identifiers';
import { BUILD_OPTIMIZER_COLOCATE } from './r3_types';
import { createFactory } from './r3_view_compiler';
/**
 * Write a pipe definition to the output context.
 */
export function compilePipe(outputCtx, pipe, reflector, mode) {
    var definitionMapValues = [];
    // e.g. `name: 'myPipe'`
    definitionMapValues.push({ key: 'name', value: o.literal(pipe.name), quoted: false });
    // e.g. `type: MyPipe`
    definitionMapValues.push({ key: 'type', value: outputCtx.importExpr(pipe.type.reference), quoted: false });
    // e.g. factory: function MyPipe_Factory() { return new MyPipe(); },
    var templateFactory = createFactory(pipe.type, outputCtx, reflector, []);
    definitionMapValues.push({ key: 'factory', value: templateFactory, quoted: false });
    // e.g. pure: true
    if (pipe.pure) {
        definitionMapValues.push({ key: 'pure', value: o.literal(true), quoted: false });
    }
    var className = identifierName(pipe.type);
    className || error("Cannot resolve the name of " + pipe.type);
    var definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
    var definitionFunction = o.importExpr(R3.definePipe).callFn([o.literalMap(definitionMapValues)]);
    if (mode === 0 /* PartialClass */) {
        outputCtx.statements.push(new o.ClassStmt(
        /* name */ className, 
        /* parent */ null, 
        /* fields */ [new o.ClassField(
            /* name */ definitionField, 
            /* type */ o.INFERRED_TYPE, 
            /* modifiers */ [o.StmtModifier.Static], 
            /* initializer */ definitionFunction)], 
        /* getters */ [], 
        /* constructorMethod */ new o.ClassMethod(null, [], []), 
        /* methods */ []));
    }
    else {
        // Create back-patch definition.
        var classReference = outputCtx.importExpr(pipe.type.reference);
        // Create the back-patch statement
        outputCtx.statements.push(new o.CommentStmt(BUILD_OPTIMIZER_COLOCATE), classReference.prop(definitionField).set(definitionFunction).toStmt());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFnRCxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdsRyxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBZ0IsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdDLE9BQU8sRUFBQyxXQUFXLElBQUksRUFBRSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHdCQUF3QixFQUFhLE1BQU0sWUFBWSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRDs7R0FFRztBQUNILE1BQU0sc0JBQ0YsU0FBd0IsRUFBRSxJQUF5QixFQUFFLFNBQTJCLEVBQ2hGLElBQWdCO0lBQ2xCLElBQU0sbUJBQW1CLEdBQTBELEVBQUUsQ0FBQztJQUV0Rix3QkFBd0I7SUFDeEIsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFcEYsc0JBQXNCO0lBQ3RCLG1CQUFtQixDQUFDLElBQUksQ0FDcEIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFcEYsb0VBQW9FO0lBQ3BFLElBQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0UsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRWxGLGtCQUFrQjtJQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNkLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELElBQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFHLENBQUM7SUFDOUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxnQ0FBOEIsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDO0lBRTlELElBQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxjQUFxQixDQUFDO0lBQ25GLElBQU0sa0JBQWtCLEdBQ3BCLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUsRUFBRSxDQUFDLENBQUMsSUFBSSx5QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDckMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUztRQUNyQyxVQUFVLENBQUMsU0FBUztRQUNwQixZQUFZLENBQUMsSUFBSTtRQUNqQixZQUFZLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO1lBQ3pCLFVBQVUsQ0FBQyxlQUFlO1lBQzFCLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUMxQixlQUFlLENBQUEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFDLGFBQWEsQ0FBQSxFQUFFO1FBQ2YsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3ZELGFBQWEsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGdDQUFnQztRQUNoQyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakUsa0NBQWtDO1FBQ2xDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsRUFDM0MsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZVBpcGVNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0RlZmluaXRpb25LaW5kfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBlcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7SWRlbnRpZmllcnMgYXMgUjN9IGZyb20gJy4vcjNfaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtCVUlMRF9PUFRJTUlaRVJfQ09MT0NBVEUsIE91dHB1dE1vZGV9IGZyb20gJy4vcjNfdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVGYWN0b3J5fSBmcm9tICcuL3IzX3ZpZXdfY29tcGlsZXInO1xuXG4vKipcbiAqIFdyaXRlIGEgcGlwZSBkZWZpbml0aW9uIHRvIHRoZSBvdXRwdXQgY29udGV4dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVQaXBlKFxuICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcGlwZTogQ29tcGlsZVBpcGVNZXRhZGF0YSwgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yLFxuICAgIG1vZGU6IE91dHB1dE1vZGUpIHtcbiAgY29uc3QgZGVmaW5pdGlvbk1hcFZhbHVlczoge2tleTogc3RyaW5nLCBxdW90ZWQ6IGJvb2xlYW4sIHZhbHVlOiBvLkV4cHJlc3Npb259W10gPSBbXTtcblxuICAvLyBlLmcuIGBuYW1lOiAnbXlQaXBlJ2BcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICduYW1lJywgdmFsdWU6IG8ubGl0ZXJhbChwaXBlLm5hbWUpLCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgLy8gZS5nLiBgdHlwZTogTXlQaXBlYFxuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goXG4gICAgICB7a2V5OiAndHlwZScsIHZhbHVlOiBvdXRwdXRDdHguaW1wb3J0RXhwcihwaXBlLnR5cGUucmVmZXJlbmNlKSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gZmFjdG9yeTogZnVuY3Rpb24gTXlQaXBlX0ZhY3RvcnkoKSB7IHJldHVybiBuZXcgTXlQaXBlKCk7IH0sXG4gIGNvbnN0IHRlbXBsYXRlRmFjdG9yeSA9IGNyZWF0ZUZhY3RvcnkocGlwZS50eXBlLCBvdXRwdXRDdHgsIHJlZmxlY3RvciwgW10pO1xuICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ2ZhY3RvcnknLCB2YWx1ZTogdGVtcGxhdGVGYWN0b3J5LCBxdW90ZWQ6IGZhbHNlfSk7XG5cbiAgLy8gZS5nLiBwdXJlOiB0cnVlXG4gIGlmIChwaXBlLnB1cmUpIHtcbiAgICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleTogJ3B1cmUnLCB2YWx1ZTogby5saXRlcmFsKHRydWUpLCBxdW90ZWQ6IGZhbHNlfSk7XG4gIH1cblxuICBjb25zdCBjbGFzc05hbWUgPSBpZGVudGlmaWVyTmFtZShwaXBlLnR5cGUpICE7XG4gIGNsYXNzTmFtZSB8fCBlcnJvcihgQ2Fubm90IHJlc29sdmUgdGhlIG5hbWUgb2YgJHtwaXBlLnR5cGV9YCk7XG5cbiAgY29uc3QgZGVmaW5pdGlvbkZpZWxkID0gb3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5wcm9wZXJ0eU5hbWVPZihEZWZpbml0aW9uS2luZC5QaXBlKTtcbiAgY29uc3QgZGVmaW5pdGlvbkZ1bmN0aW9uID1cbiAgICAgIG8uaW1wb3J0RXhwcihSMy5kZWZpbmVQaXBlKS5jYWxsRm4oW28ubGl0ZXJhbE1hcChkZWZpbml0aW9uTWFwVmFsdWVzKV0pO1xuXG4gIGlmIChtb2RlID09PSBPdXRwdXRNb2RlLlBhcnRpYWxDbGFzcykge1xuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2gobmV3IG8uQ2xhc3NTdG10KFxuICAgICAgICAvKiBuYW1lICovIGNsYXNzTmFtZSxcbiAgICAgICAgLyogcGFyZW50ICovIG51bGwsXG4gICAgICAgIC8qIGZpZWxkcyAqL1tuZXcgby5DbGFzc0ZpZWxkKFxuICAgICAgICAgICAgLyogbmFtZSAqLyBkZWZpbml0aW9uRmllbGQsXG4gICAgICAgICAgICAvKiB0eXBlICovIG8uSU5GRVJSRURfVFlQRSxcbiAgICAgICAgICAgIC8qIG1vZGlmaWVycyAqL1tvLlN0bXRNb2RpZmllci5TdGF0aWNdLFxuICAgICAgICAgICAgLyogaW5pdGlhbGl6ZXIgKi8gZGVmaW5pdGlvbkZ1bmN0aW9uKV0sXG4gICAgICAgIC8qIGdldHRlcnMgKi9bXSxcbiAgICAgICAgLyogY29uc3RydWN0b3JNZXRob2QgKi8gbmV3IG8uQ2xhc3NNZXRob2QobnVsbCwgW10sIFtdKSxcbiAgICAgICAgLyogbWV0aG9kcyAqL1tdKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ3JlYXRlIGJhY2stcGF0Y2ggZGVmaW5pdGlvbi5cbiAgICBjb25zdCBjbGFzc1JlZmVyZW5jZSA9IG91dHB1dEN0eC5pbXBvcnRFeHByKHBpcGUudHlwZS5yZWZlcmVuY2UpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBiYWNrLXBhdGNoIHN0YXRlbWVudFxuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgIG5ldyBvLkNvbW1lbnRTdG10KEJVSUxEX09QVElNSVpFUl9DT0xPQ0FURSksXG4gICAgICAgIGNsYXNzUmVmZXJlbmNlLnByb3AoZGVmaW5pdGlvbkZpZWxkKS5zZXQoZGVmaW5pdGlvbkZ1bmN0aW9uKS50b1N0bXQoKSk7XG4gIH1cbn0iXX0=