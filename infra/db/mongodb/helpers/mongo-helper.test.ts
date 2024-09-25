import mongoose from 'mongoose';
import mongoDbConnection from './mongo-helper';

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    await mongoDbConnection();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to MongoDB successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
