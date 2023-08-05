const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());

const adminRouter = require('./routes/admin');
const eventsRouter = require('./routes/events');
const loginRouter = require('./routes/login');
const participantsRouter = require('./routes/participants');

const PORT = process.env.PORT || 8080;

server.use('/', adminRouter);
server.use('/', eventsRouter);
server.use('/', loginRouter);
server.use('/', participantsRouter);

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
