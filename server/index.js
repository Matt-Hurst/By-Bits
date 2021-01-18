const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./router');

const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
