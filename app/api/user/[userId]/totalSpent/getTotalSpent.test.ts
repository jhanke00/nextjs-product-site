import { GET } from './route';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '@utils/apiErrors';
import { getUserTotalSpent } from '@utils/order/orderService';

jest.mock('@utils/order/orderService');
jest.mock('@utils/apiErrors');

describe('GET /api/user/[userId]/totalSpent', () => {
  const mockUserId = '123';
  const mockContext = { params: { userId: mockUserId } } as any;
  const mockRequest = {} as NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return total spent data if user is found', async () => {
    const mockData = { totalSpent: 100 };
    (getUserTotalSpent as jest.Mock).mockResolvedValue(mockData);

    const response = await GET(mockRequest, mockContext);

    expect(getUserTotalSpent).toHaveBeenCalledWith(mockUserId);
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ data: mockData, message: 'User spent found' }, { status: 200 }))
    );
  });

  it('should handle errors correctly', async () => {
    const error = new Error('Something went wrong');
    (getUserTotalSpent as jest.Mock).mockImplementation(() => {
      throw error;
    });
    (handleError as jest.Mock).mockImplementation((req, error) => {
      return NextResponse.json({ error: error.message }, { status: 500 });
    });

    const response = await GET(mockRequest, mockContext);

    expect(getUserTotalSpent).toHaveBeenCalledWith(mockUserId);
    expect(handleError).toHaveBeenCalledWith(mockRequest, error);
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(NextResponse.json({ error: error.message }, { status: 500 }))
    );
  });
});
