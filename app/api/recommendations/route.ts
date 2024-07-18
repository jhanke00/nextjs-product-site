import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/src/utils/recommendations';
import { Recommendation } from '@/src/type/Recommendation';

export async function GET(request: NextRequest): Promise<NextResponse<Recommendation[] | { error: string }>> {
  try {
    const userId = request.nextUrl.searchParams.get('userId'); // Get userId from query params or other source

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const recommendations = await getRecommendations(userId); 

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
