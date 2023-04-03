const Tour = require('../db/tourModel');
const User = require('../db/userModel');
const Booking = require('../db/bookingModel');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    // get the current booked tour
    const tour = await Tour.findById(req.params.tourId);

    //with the new stripe api

    // product must be created using the tour name
    // const product = await stripe.products.create({
    //   name: tour.name,
    // });
    // console.log(product);

    // price must also be created for the product

    // const price = await stripe.prices.create({
    //   unit_amount: tour.price * 100,
    //   currency: 'usd',
    //   product: 'prod_Ndqn3s9ASUKTjR',
    // });
    // console.log(price);

    //2 create checkout session and send to client
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // success_url: `${req.protocol}://${req.get(
      //   'host'
      // )}/my-tours?alert=booking`,
      success_url: `${req.protocol}://${req.get('host')}/my-tours`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [{ price: 'price_1MsZAKDxuU00IA8fqUMdwC4Q', quantity: 1 }],
    });

    res.status(200).json({
      status: 'succcess',
      session,
    });
  } catch (error) {
    next(error);
  }
};

// exports.createBookingCheckout = async (req, res, next) => {
//   try {
//     // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
//     const { tour, user, price } = req.query;

//     if (!tour && !user && !price) return next();
//     await Booking.create({ tour, user, price });

//     res.redirect(req.originalUrl.split('?')[0]);
//   } catch (error) {
//     next(error);
//   }
// };
const createBookingCheckout = async (session) => {
  try {
    const tour = session.client_reference_id;
    const userEmail = (await User.findOne({ email: session.customer_email }))
      .id;
    const price = session.amount_subtotal / 100;
  } catch (error) {}
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }
  res.status(200).json({ receieved: true });
};
