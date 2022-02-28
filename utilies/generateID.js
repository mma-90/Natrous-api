module.exports = () => {
  const randomString = Math.random().toString(36).substring(2);
  return randomString + randomString;
};
