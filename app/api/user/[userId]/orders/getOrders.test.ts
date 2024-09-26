import { NextRequest, NextResponse } from 'next/server';
import { GET } from './route';
import { getOrdersByUserId } from '@utils/order/orderService';
import { handleError } from '@utils/apiErrors';

jest.mock('@utils/order/orderService');
jest.mock('@utils/apiErrors');

describe('GET /api/user/[userId]/orders', () => {
  const mockUserId = '12345';
  const mockContext = { params: { userId: mockUserId } } as any;
  const mockRequest = {} as NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user orders with status 200', async () => {
    const mockOrders = [{ id: 'order1' }, { id: 'order2' }];
    (getOrdersByUserId as jest.Mock).mockResolvedValue(mockOrders);

    const response = await GET(mockRequest, mockContext);

    expect(getOrdersByUserId).toHaveBeenCalledWith(mockUserId);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ data: mockOrders, message: 'User orders found' });
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Something went wrong');
    (getOrdersByUserId as jest.Mock).mockRejectedValue(mockError);
    (handleError as jest.Mock).mockReturnValue(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));

    const response = await GET(mockRequest, mockContext);

    expect(getOrdersByUserId).toHaveBeenCalledWith(mockUserId);
    expect(handleError).toHaveBeenCalledWith(mockRequest, mockError);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Internal Server Error' });
  });
});
