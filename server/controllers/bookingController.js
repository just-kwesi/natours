const Tour = require('../db/tourModel');
const Booking = require('../db/bookingModel');
// const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    // get the current booked tour

    const tour = await Tour.findById(req.params.tourID);

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
      success_url: `${req.protocol}://${req.get('host')}?tours=${
        req.params.tourId
      }&user=${req.user.id}&price=${tour.price}`,
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

exports.createBookingCheckout = async (req, res, next) => {
  try {
    // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
    const { tour, user, price } = req.query;

    if (!tour && !user && !price) return next();
    await Booking.create({ tour, user, price });

    res.redirect(req.originalUrl.split('?')[0]);
  } catch (error) {
    next(error);
  }
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
