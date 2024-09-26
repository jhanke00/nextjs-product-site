/* eslint-disable no-unused-vars */
import { IValidator } from '@/src/domain/validators/validator';
import Joi, { Schema } from 'joi';

export class SchemaValidator<T> implements IValidator<T> {
  constructor(private schema: Schema) {}

  validate(input: T): boolean {
    const { error } = this.schema.validate(input);
    return !error;
  }
}