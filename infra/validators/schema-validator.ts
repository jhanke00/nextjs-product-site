import { IValidator } from '@/src/domain/validators/validator';
import Joi, { Schema } from 'joi';

export class SchemaValidator<T> implements IValidator<T> {
  constructor(private schema: Schema) {}

  validate(input: T): { isValid: boolean; errorMessage?: string; output: T } {
    const { error, value } = this.schema.validate(input);

    return {
      isValid: !error,
      errorMessage: error?.message,
      output: value as T,
    };
  }
}
