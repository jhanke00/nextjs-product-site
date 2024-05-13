import { verifyJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/db';

// protected route
export async function GET(request: Request) {
  const accessToken = request.headers.get('Authorization');
  const limit = 20;

  if (accessToken && verifyJwt(accessToken)) {
    const client = await connectToDatabase();
    const db = client.db();
    const productsCursor = db.collection('products').find({}, { projection: { _id: 0 } });

    const products = await productsCursor.limit(limit).toArray();
    client.close();
    return new Response(JSON.stringify(products, null, 2), {
      status: 200,
    });
  }

  return new Response('unauthorized', { status: 401 });
}
