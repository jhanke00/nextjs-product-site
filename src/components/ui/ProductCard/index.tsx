import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Rating, Chip } from '@mui/material';
import { Product } from '@/src/type/products';
import Link from 'next/link';

interface Props {
  product: Product;
}

const styles = {
  card: {
    margin: '5px',
    position: 'relative',
    backgroundColor: 'rgb(18, 18, 18)',
    color: 'white',
    minWidth: 400,
  },
  chip: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'primary.main',
    color: 'white',
  },
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={styles.card} variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h5' component='h3'>
          {product.name}
        </Typography>
        <Chip sx={styles.chip} label={product.category} />
        <Typography variant='body2'>{product.description}</Typography>
        <Typography variant='h6' sx={{ marginTop: 2 }}>
          ${product.price}
        </Typography>
        <Typography variant='body2'>In Stock: {product.countInStock}</Typography>
        <Rating name='product-rating' value={product.rating} readOnly precision={0.1} sx={{ marginTop: 1 }} />
        <Typography variant='body2'>{product.numReviews} reviews</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
