const resources = {
  users: 'users',
  userOrder: 'userOrder',
};

// Define permissions for admin and user roles
const permissions = {
  // Admin permissions
  admin: {
    create: 'create:any',
    read: 'read:any',
    update: 'update:any',
    delete: 'delete:any',
    createOwn: 'create:own',
    updateOwn: 'update:own',
    deleteOwn: 'delete:own',
    readOwn: 'read:own',
  },
  // User permissions
  user: {
    create: 'create:any',
    read: 'read:any',
    update: 'update:any',
    delete: 'delete:any',
  },
};

module.exports = {
  permissions,
  resources,
};
