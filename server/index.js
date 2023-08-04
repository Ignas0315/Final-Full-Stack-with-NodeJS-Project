const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

const adminRouter = require('./routes/admin');

const PORT = process.env.PORT || 8080;

server.use('/', adminRouter);

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
