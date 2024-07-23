import { Recommendation } from '@/src/type/Recommendation';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className='recommendation-card'>
      <img src={recommendation.imageUrl} alt={recommendation.title} />
      <h3>{recommendation.title}</h3>
      <p>Price: ${recommendation.price}</p>
      {/* Add to Cart button or other actions */}
      <button>Add to Cart</button>
    </div>
  );
}
