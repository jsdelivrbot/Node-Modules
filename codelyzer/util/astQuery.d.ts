import * as ts from 'typescript';
import { Maybe } from './function';
export declare function isCallExpression(expr: ts.LeftHandSideExpression): expr is ts.CallExpression;
export declare function callExpression(dec: ts.Decorator): Maybe<ts.CallExpression>;
export declare function isPropertyAssignment(expr: ts.ObjectLiteralElement): expr is ts.PropertyAssignment;
export declare function isSimpleTemplateString(expr: ts.Expression): expr is (ts.StringLiteral | ts.NoSubstitutionTemplateLiteral);
export declare function isArrayLiteralExpression(expr: ts.Expression): expr is ts.ArrayLiteralExpression;
export declare function hasProperties(expr: ts.ObjectLiteralExpression): boolean;
export declare function isObjectLiteralExpression(expr: ts.Expression): expr is ts.ObjectLiteralExpression;
export declare function objectLiteralExpression(expr: ts.CallExpression): Maybe<ts.ObjectLiteralExpression>;
export declare function isIdentifier(expr: ts.PropertyName | ts.LeftHandSideExpression): expr is ts.Identifier;
export declare function withIdentifier(identifier: string): (expr: ts.CallExpression) => Maybe<ts.CallExpression>;
export declare type WithStringInitializer = ts.StringLiteral | ts.NoSubstitutionTemplateLiteral;
export declare function isProperty(propName: string, p: ts.ObjectLiteralElement): boolean;
export declare function getInitializer(p: ts.ObjectLiteralElement): Maybe<ts.Expression>;
export declare function getStringInitializerFromProperty(propertyName: string, ps: ts.ObjectLiteralElement[]): Maybe<WithStringInitializer>;
export declare function decoratorArgument(dec: ts.Decorator): Maybe<ts.ObjectLiteralExpression>;
export declare function isDecorator(expr: ts.Node): expr is ts.Decorator;