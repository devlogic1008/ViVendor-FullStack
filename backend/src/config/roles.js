const roles = {
  superAdmin: {
    permissions: ['read', 'write', 'edit', 'delete'],
  },
  admin: {
    permissions: ['read', 'write'],
  },
  user: {
    permissions: ['read', 'write'],
  },
  editor: {
    permissions: ['read', 'edit'],
  },
};

module.exports = roles;
