import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51MsXKCDxuU00IA8fBCbt1KHY4wA1mKbii1Qt8ShVi3aiivhFsj8I9YiumlaB7iOVzcd7k5nbtdnTKgh451VhmdGU008mHfLany'
);

export const bookTour = async (tourId) => {
  try {
    //1) get check session

    const session = await axios(
      `http://localhost:8000/api/v1/booking/checkout-session/${tourId}`
    );
    // console.log(session);
    //2) create checkout form + charge credit card
    window.location.replace(session.data.session.url);
  } catch (error) {
    showAlert('error', error);
  }
};
