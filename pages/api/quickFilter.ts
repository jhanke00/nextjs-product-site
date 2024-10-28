import { NextApiRequest, NextApiResponse } from 'next';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      quickFilterOptions(req, res);
    default:
      res.status(404);
  }
}

function quickFilterOptions(req: NextApiRequest, res: NextApiResponse) {
  const data = [...largeData, ...smallData];

  const categories: Record<string, boolean> = {};

  data.forEach((d) => (categories[d.category] = true));

  res.status(200).json({
    rating: ['1', '2', '3', '4', '5'],
    category: Object.keys(categories),
  });
}
