import { Recommendation } from '@/src/type/Recommendation';
import RecommendationCard from './RecommendationCard';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  return (
    <div className='recommendations-list'>
      {recommendations.map((recommendation) => (
        <RecommendationCard key={recommendation.id} recommendation={recommendation} />
      ))}
    </div>
  );
}
