const express = require('express');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const permissionRoute = require('./permission.route');
const productRoute = require('./product.route');
const tagRoute = require('./tags.route');
const router = express.Router();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false })); // Express built-in middleware
app.use(express.json()); // Express built-in middleware

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
    path: '/users',
    route: userRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  },
  {
    path: '/permission',
    route: permissionRoute,
  },
  {
    path: '/tag',
    route: tagRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
