let accessToken = null;

const setToken = (token) => {
  accessToken = token;
};

const getToken = () => accessToken;

module.exports = {
  setToken,
  getToken,
};