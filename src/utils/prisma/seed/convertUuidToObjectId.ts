import { ObjectId } from 'bson';

export function convertUuidToObjectId(uuid: string) {
  const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');

  const paddedBuffer = Buffer.alloc(12);
  buffer.copy(paddedBuffer, 12 - Math.min(buffer.length, 12));

  return new ObjectId(paddedBuffer).toHexString();
}
