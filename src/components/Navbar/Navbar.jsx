import React from 'react';
// import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/rising.png';

import useStyles from './styles';

const Navbar = ( { totalItems }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className="classes.appBar" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="risingbakeshop.js" height="25px" className={classes.image} />
            Rising Bake Shop
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button} >
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar