const responseFormat = (response) => {
  const { data, success } = response;
  return {
    data,
    success,
  };
};
export default responseFormat;
