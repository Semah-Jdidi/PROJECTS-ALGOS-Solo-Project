const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }), cors({credentials: true, origin: 'http://localhost:3000'}), cookieParser());
require('./routes/user.routes')(app);
require('./routes/book.routes')(app);

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}`));