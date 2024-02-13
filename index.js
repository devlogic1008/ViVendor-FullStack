import express from 'express';
// import auth from './api/auth/auth.routes.js';
// import routes from './routes.js';

import 'dotenv/config';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Welcome to the API!' });
});
// app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
