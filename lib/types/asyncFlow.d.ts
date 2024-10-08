import { Reducer } from 'redux';
import { Nullable } from './core';
/**
 * State shapes
 */
export interface AsyncState<T extends any> {
    asyncState: AsyncStateType;
    data: T;
    error: Nullable<ErrorState>;
}
export interface ErrorState {
    error: any;
    message: Nullable<string>;
}
/**
 * Async action type
 */
export declare enum AsyncStateType {
    IDLE = 0,
    WORKING = 1,
    FULLFILLED = 2,
    FAILED = 3
}
/**
 * Action type union
 */
export type AsyncActionType = AsyncAction | AsyncParamAction | AsyncCompletedAction | AsyncErrorAction;
/**
 * Async action definitions.
 */
export interface AsyncAction {
    type: string;
}
/**
 * General parameter passing actions
 */
export interface AsyncParamAction extends AsyncAction {
    param?: any;
}
/**
 * Completed async action for propagating the result data
 */
export interface AsyncCompletedAction extends AsyncAction {
    data: any;
}
/**
 * Error async action for propagating error and optional message
 */
export interface AsyncErrorAction extends AsyncAction {
    error: any;
    message: Nullable<string>;
    data?: any;
}
/**
 * Default action function declaration for async flow
 */
export type AsyncActionFunction = (param?: any) => AsyncParamAction;
/**
 * Completed action function declaration for async flow
 */
export type AsyncActionCompletedFunction = (data: any) => AsyncCompletedAction;
/**
 * Error action function declaration for async flow
 */
export type AsyncActionErrorFunction = (error: any, message: Nullable<string>, data?: any) => AsyncErrorAction;
/**
 * Parser function declaration for parsing the raw response to types result data
 */
export type ParserFunction<T extends any> = (data: any) => T;
/**
 * Core set of flow actions
 */
export interface CoreAsyncFlowActionTypes {
    working: string;
    completed: string;
    error: string;
    reset: Nullable<string>;
}
export type FlowActionTypes = {
    [key: string]: AsyncFlowActionTypes;
};
/**
 * Async flow action type wrapper
 */
export interface AsyncFlowActionTypes extends CoreAsyncFlowActionTypes {
    fetch: string;
}
/**
 * Async flow handler declaration
 */
export interface CoreAsyncFlowHandler<T extends any> {
    asyncWorkingAction: AsyncActionFunction;
    asyncCompletedAction: AsyncActionCompletedFunction;
    asyncErrorAction: AsyncActionErrorFunction;
    asyncResetAction: Nullable<AsyncActionFunction>;
    parserFunction: ParserFunction<T>;
}
/**
 * Async flow handler declaration
 */
export interface AsyncFlowHandler<S, A extends AsyncActionType, T extends any> extends CoreAsyncFlowHandler<T> {
    asyncAction: AsyncActionFunction;
    reducer: Reducer<S, A>;
}
