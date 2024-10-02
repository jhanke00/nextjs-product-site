import { NextRequest, NextResponse } from 'next/server';
import { NotFoundError, ValidationError } from '@utils/apiErrors';
import { handleError } from './handleError';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('handleError', () => {
  let req: NextRequest;

  beforeEach(() => {
    req = {
      url: '/api/test',
    } as NextRequest;
    jest.clearAllMocks();
  });

  it('should return 404 response for NotFoundError', () => {
    const error = new NotFoundError('Resource not found');

    handleError(req, error);

    expect(NextResponse.json).toHaveBeenCalledWith({ success: false, message: 'Resource not found' }, { status: 404 });
  });

  it('should return 400 response for ValidationError', () => {
    const error = new ValidationError('Invalid input');

    handleError(req, error);

    expect(NextResponse.json).toHaveBeenCalledWith({ success: false, message: 'Invalid input' }, { status: 400 });
  });

  it('should return 500 response for unexpected errors', () => {
    const error = new Error('Unexpected error');

    console.error = jest.fn();

    handleError(req, error);

    expect(console.error).toHaveBeenCalledWith(error, `\n[Unexpected error] Unexpected error: /api/test`);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  });
});
