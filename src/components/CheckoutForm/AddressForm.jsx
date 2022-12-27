import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, Paper } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
  const { handleSubmit, reset, control } = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
  // const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[234]);
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[15]);
  }

  // const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
  //   const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
  //   setShippingOption(options[0].id);
  // }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  // useEffect(() => {
  //   if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  // }, [shippingSubdivision]);


  const onSubmit = data => {
    console.log('address form, form data: ', data)
    next({...data, shippingCountry, shippingSubdivision })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
            name={"firstName"}
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"First Name"} />
            )}/>
            </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
            name={"lastName"}
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"Last Name"} />
            )}/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, value } }) => (
              <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"Email"} />
              )}/>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
            name={"address"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"Address"} />
              )}
              />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
            name={"apt"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"Apt./ Unit"} />
              )}
              />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
            name={"city"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"City"} />
              )}
              />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
            name={"zip"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField style={{ flex: 1, width: '100%' }} onChange={onChange} value={value} label={"Zip Code"} />
              )}
              />
          </Grid>
            <Grid item xs={12} sm={8}>
              <InputLabel>Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputLabel>State</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} to="/cart" variant='outlined'>Back to cart</Button>
              <Button type='submit' variant='contained' color='primary'>Next</Button>
            </div>
          

      </form>

    </>
  );
};



export default AddressForm;
