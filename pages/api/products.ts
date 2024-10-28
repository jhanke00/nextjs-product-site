import { NextApiRequest, NextApiResponse } from 'next';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      listProducts(req, res);
      break;
    default:
      res.status(404);
  }

  function listProducts(req: NextApiRequest, res: NextApiResponse) {
    const data = [...largeData, ...smallData];

    const categoryFilter = req.query.category;
    const ratingsFilter = req.query.rating;
    const minPriceFilter = req.query.minprice;
    const maxPriceFilter = req.query.maxprice;

    const filtered = data
      .filter((d) => !categoryFilter || d.category === categoryFilter)
      .filter((d) => !ratingsFilter || d.rating.toFixed(2).split('.')[0] === ratingsFilter)
      .filter(
        (d) =>
          (!minPriceFilter || Number(d.price) >= Number(minPriceFilter)) &&
          (!maxPriceFilter || Number(d.price) <= Number(maxPriceFilter))
      );

    res.status(200).json(filtered);
  }
}
