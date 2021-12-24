require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// My Routers
const authRouter = require('./routes/authRouter')();
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const stripeRouter = require('./routes/stripeRouter');

const app = express();
const port = process.env.PORT || 3030;

// Connect to Database
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => debug(`DB connected: ${new Date().toLocaleString()}`))
  .catch((err) => debug(err));

// Middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/stripe', stripeRouter);

app.listen(port, () => {
  debug(`Server Started at.... ${port}`);
});
