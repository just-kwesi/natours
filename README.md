# Natours Rest

## Project Overview

Natours Rest is a RESTful API built with JavaScript, Express, Pug, Stripe, and MongoDB. It provides a backend service for the Natours tour booking platform, allowing users to view and book tours, make payments, and manage their bookings.

## Technologies Used

- JavaScript
- Express
- Pug
- Stripe
- MongoDB
- Multer
- bcryptjs

## Setup and Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up environment variables:
   - `MONGODB_CONNECTION_STRING`: the port on which the server should listen
   - `MONGO_URI`: the URI of the MongoDB database
   - `STRIPE_SECRET_KEY`: the secret key for the Stripe API
   - `JWT_SECRET`: jwt secret used for creating signin tokens
4. Start the server with `npm start`.

## API Documentation

API documentation is available [here](https://documenter.getpostman.com/view/24297290/2s93RWMqY4)

## Deployment

To deploy the project to a production environment, you will need to set up a MongoDB database and a Stripe account, and configure the appropriate environment variables.

## Debugging

Debugs can be run with `npm run debug`.

## Contributors

- Frederick Tetteh (Sole Developer)
