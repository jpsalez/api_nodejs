require('dotenv').config();
require('./database/index');
const express = require('express');
const router = require('./routes');


const app = express();

app.use(express.json());

app.get('/health', (req,res) =>{
    res.send({message : "server on"});
});

app.use(router);



app.listen(process.env.PORT, () => {
    console.log('server is on in port 3000');
});

