require('dotenv').config();
require('./database/index');
const express = require('express');

const routes = require('./router');

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('server is on in port 3000');
});

