import { GET } from './route';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getUserById } from '@utils/user/userService';
import { handleError } from '@utils/apiErrors';

jest.mock('@utils/user/userService');
jest.mock('@utils/apiErrors');

describe('GET /api/user/[userId]', () => {
  const mockUserId = '123';
  const mockContext = { params: { userId: mockUserId } } as any;
  const mockRequest = {} as NextApiRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data if user is found', async () => {
    const mockUser = { id: mockUserId, name: 'John Doe' };
    (getUserById as jest.Mock).mockResolvedValue(mockUser);

    const response = await GET(mockRequest, mockContext);

    expect(getUserById).toHaveBeenCalledWith(mockUserId);
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ user: mockUser, message: 'User found' }, { status: 200 }))
    );
  });

  it('should return 404 if user is not found', async () => {
    (getUserById as jest.Mock).mockResolvedValue(null);
    (handleError as jest.Mock).mockImplementation((req, error) => {
      return NextResponse.json({ error: error.message }, { status: 404 });
    });

    const response = await GET(mockRequest, mockContext);

    expect(getUserById).toHaveBeenCalledWith(mockUserId);
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ error: `User with id ${mockUserId} not found` }, { status: 404 }))
    );
  });

  it('should handle validation errors', async () => {
    const validationError = new Error('Invalid userId');
    (handleError as jest.Mock).mockImplementation((req, error) => {
      return NextResponse.json({ error: error.message }, { status: 400 });
    });

    const response = await GET(mockRequest, mockContext);

    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ error: validationError.message }, { status: 400 }))
    );
  });

  it('should handle unexpected errors', async () => {
    const unexpectedError = new Error('Unexpected error');
    (getUserById as jest.Mock).mockImplementation(() => {
      throw unexpectedError;
    });
    (handleError as jest.Mock).mockImplementation((req, error) => {
      return NextResponse.json({ error: error.message }, { status: 500 });
    });

    const response = await GET(mockRequest, mockContext);

    expect(getUserById).toHaveBeenCalledWith(mockUserId);
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ error: unexpectedError.message }, { status: 500 }))
    );
  });
});
