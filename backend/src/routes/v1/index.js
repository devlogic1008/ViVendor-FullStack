const express = require('express');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const tagRoute = require('./tags.route');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({exteded:false}));
app.use(bodyParser.json())

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/tag',
    route: tagRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
