import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];


const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        setCheckoutToken(token);
      } catch (error) {
        console.log('checkout form, error: ', error)
        // navigate('/') // if you're in checkout but there's an error go back to home page
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevoiusActiveStep) => prevoiusActiveStep + 1);
  const backStep = () => setActiveStep((prevoiusActiveStep) => prevoiusActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  // console.log('order data: ', order)

  const Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant='h5'>Thanks for your order, {order.customer.firstname}!</Typography>
        <br />
        <Divider className={classes.Divider}></Divider>
        <br />
        <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  )  : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );

  if (error) {
    <>
    <Typography variant='h5'>Error: {error}</Typography>
    <br />
    <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  }

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

  return (
    <>
    <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>

      </main>
    </>
  )
}

export default Checkout
