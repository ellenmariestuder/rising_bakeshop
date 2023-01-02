import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  return(
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart}/>
          </Grid>
        ))}
      </Grid>
        <br />
        <div style = {{ display: 'flex', justifyContent: 'right' }}>
          <Button component={Link} to="/cart" variant='outlined'>Go To Cart</Button>
        </div>
    </main>
  )
  
}

export default Products;