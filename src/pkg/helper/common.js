const defaultResponse = ({ status, data, message }) => {
  let response = {};

  if (status) {
    response = { ...response, status };
  }
  if (message) {
    response = { ...response, message };
  }
  if (data) {
    response = { ...response, data };
  }

  return response;
};

module.exports = { defaultResponse };
