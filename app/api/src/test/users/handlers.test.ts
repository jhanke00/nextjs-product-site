import { Request, Response } from 'express';
import { getUserById, getOrdersByUserId, getOrdersSpentByUserId } from '../../users/handlers';
import { testMockData } from '../../__mock__/testMockData';
import { data } from '../../__mock__/data';
import {
  expectedResponseOrdersFrom,
  expectedResponseOrdersTo,
  expectedResponseOrdersFromTo,
  expectedResponseOrdersAll,
  expectedNotAllowedResponse,
  expectedUserNotFoundResponse,
  expectedNoOrderFoundResponse,
  expectedOrdersSpentFromResponse,
  expectedOrdersSpentToResponse,
  expectedOrdersSpentFromToResponse,
  expectedOrdersSpentAllResponse,
} from '../../__mock__/expectedResponse';

jest.mock('express');
jest.mock('./../../__mock__/data');

data.users = testMockData.users;
data.orders = testMockData.orders;

afterEach(() => {
  jest.clearAllMocks();
});

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
} as unknown as Response;

describe('User handlers suite', () => {
  describe('Get user by ID', () => {
    it('Should get a user and a status code 200 when user found by ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'b941c4f6-9c4f-439a-811a-bd15998aebb1',
        },
      } as unknown as Request;

      getUserById(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        response: {
          id: 'b941c4f6-9c4f-439a-811a-bd15998aebb1',
          firstName: 'Brenna',
          lastName: 'Boyle',
          phoneNumber: '987.309.6087 x860',
          email: 'Brenna.Boyle@gmail.com',
        },
      });
    });

    it('Should return an error response and status 405 if verb is not GET', () => {
      const mockRequest = {
        method: 'POST',
      } as unknown as Request;

      getUserById(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(405);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedNotAllowedResponse);
    });

    it('Should return an error response and status 404 if user not found', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'xxxx33x-f4e4-4dfe-a038-b7339c022f2d',
        },
      } as unknown as Request;

      getUserById(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedUserNotFoundResponse);
    });
  });

  describe('Get orders by user ID', () => {
    it('Should return an error response and status 405 if verb is not GET', () => {
      const mockRequest = {
        method: 'PUT',
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(405);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedNotAllowedResponse);
    });

    it('Should return an error response and status 404 if user not found', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'xxxx33x-f4e4-4dfe-a038-b7339c022f2d',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedUserNotFoundResponse);
    });

    it('Should return a status code 204 and an empty array if orders are not found', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: '163468e4-2d0c-4d16-82ba-d86cd1a7aa10',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedNoOrderFoundResponse);
    });

    it('Should return orders from 2024-08-01 by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          from: '2024-08-01',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponseOrdersFrom);
    });

    it('Should return orders to 2023-12-30 by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          to: '2023-12-30',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponseOrdersTo);
    });

    it('Should return orders from 2024-09-01 to 2025-03-01 by User ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          to: '2025-03-01',
          from: '2024-09-01',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponseOrdersFromTo);
    });

    it('Should return all orders by specific user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
      } as unknown as Request;

      getOrdersByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponseOrdersAll);
    });
  });

  describe('Get orders spent by user ID', () => {
    it('Should return an error response and status 405 if verb is not GET', () => {
      const mockRequest = {
        method: 'PUT',
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(405);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedNotAllowedResponse);
    });

    it('Should return an error response and status 404 if user not found', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'xxxx33x-f4e4-4dfe-a038-b7339c022f2d',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedUserNotFoundResponse);
    });

    it('Should return a status code 204 and an empty array if orders are not found', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: '163468e4-2d0c-4d16-82ba-d86cd1a7aa10',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedNoOrderFoundResponse);
    });

    it('Should return orders spent from 2024-08-01 by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          from: '2024-08-01',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrdersSpentFromResponse);
    });

    it('Should return total spent in orders to 2023-12-30 by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          to: '2023-12-30',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrdersSpentToResponse);
    });

    it('Should return orders spent from 2024-09-01 to 2025-03-01 by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
        query: {
          to: '2025-03-01',
          from: '2024-09-01',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrdersSpentFromToResponse);
    });

    it('Should return total spent in orders by user ID', () => {
      const mockRequest = {
        method: 'GET',
        params: {
          id: 'e7524b77-c241-465f-9201-21e0ada4856b',
        },
      } as unknown as Request;

      getOrdersSpentByUserId(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedOrdersSpentAllResponse);
    });
  });
});
