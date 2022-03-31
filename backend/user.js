const AllUsers = [];

function joinUser(id, username, room) {
  const currentUser = { id, username, room };

  AllUsers.push(currentUser);

  return currentUser;
}

function getCurrentUser(id) {
  return AllUsers.find((user) => user.id === id);
}

function userDisconnect(id) {
  const index = AllUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return AllUsers.splice(index, 1)[0];
  } else {
      return 'Not Found'
  }
}

module.exports = {
  joinUser,
  getCurrentUser,
  userDisconnect,
};