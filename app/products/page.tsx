'use client';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

export default function Products() {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const data = [...largeData, ...smallData];
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const productData = data.slice(startIndex, endIndex);
  const totalItems = data.length;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <Grid container spacing={2}>
          {productData.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant='h6'>{product.name.toUpperCase()}</Typography>
                  <Typography color='text.secondary'>$ {product.price}</Typography>
                  <Divider />
                  <Typography variant='caption'>
                    <br />
                    {product.description}
                  </Typography>
                  <Typography variant='body2' fontWeight='bold'>
                    <br />
                    Details
                  </Typography>
                  <TableContainer component={Paper} elevation={1}>
                    <Table aria-label='simple table'>
                      <TableBody>
                        <TableRow>
                          <TableCell align='left' sx={{ fontWeight: 'bold', color: '#c8c8c8' }}>
                            Category
                          </TableCell>
                          <TableCell align='right'>{product.category}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left' sx={{ fontWeight: 'bold', color: '#c8c8c8' }}>
                            Rating
                          </TableCell>
                          <TableCell align='right'>{product.rating.toFixed(3)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left' sx={{ fontWeight: 'bold', color: '#c8c8c8' }}>
                            Reviews qty
                          </TableCell>
                          <TableCell align='right'>{product.numReviews}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align='left' sx={{ fontWeight: 'bold', color: '#c8c8c8' }}>
                            Stock
                          </TableCell>
                          <TableCell align='right'>{product.countInStock}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className='flex justify-around w-full border-t-2 pt-4'>
        <Box>
          <TablePagination
            component='div'
            count={totalItems}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </div>
    </main>
  );
}
