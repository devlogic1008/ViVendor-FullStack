const express = require('express');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const permissionRoute = require('./permission.route');
const router = express.Router();

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
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;
