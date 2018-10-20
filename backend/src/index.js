require('dotenv').config();
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Express middleware to handle cookies (JWT)
// TODO Express middleware to populate current user


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, details => {
  console.log(`Server is now running on port http://localhost:${details.port}`);
});