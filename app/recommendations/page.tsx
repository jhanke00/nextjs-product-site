'use client';

import { useEffect, useState } from 'react';
import RecommendationsList from '@/src/components/RecommendationsList';
import { getRecommendations } from '@/src/utils/recommendations';
import { Recommendation } from '@/src/type/Recommendation';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations(); // Fetch from API route
        setRecommendations(data);
      } catch (err) {
        setError('Failed to fetch recommendations');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product Recommendations</h1>
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
}
