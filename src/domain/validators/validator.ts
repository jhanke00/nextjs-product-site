/* eslint-disable no-unused-vars */

export interface IValidator<T> {
    validate(input: T): boolean;
}