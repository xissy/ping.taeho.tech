
const errors = {
  notFound: (field) => {
    return {
      code: 404,
      message: `${field} not found`,
    };
  },
  invalid: (field) => {
    return {
      code: 400,
      message: `invalid ${field}`,
    };
  },
  forbidden: () => {
    return {
      code: 403,
      message: 'forbidden',
    };
  },
};

export {
  errors,
};
