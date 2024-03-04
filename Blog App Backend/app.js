const express = require('express');
//const router = require('./routes/postRoutes');
const middleware = require('./middlewares/middlewares');

const app = express();
app.use(express.json());

app.use('' , middleware.loggingMiddleware ,router);

app.use(middleware.errorMiddleware);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });