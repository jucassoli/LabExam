exports.isValidationError = (err) => {
  return err.err.errors && err.err.errors.status && err.err.errors.status.name == "ValidatorError"
};

exports.fixResponseData = (data) => {
  if(Array.isArray(data)) {
    data.forEach(item => fixSingle(item));
  } else {
    fixSingle(data);
  }
  return data;
};

let fixSingle = (data) => {

  let another = {
    ...data
  };

  if (another.__v !== undefined) delete another.__v;

  if (another._id) {
    let id = another._id;
    delete another._id;
    Object.assign(another, { id });
    console.log('---- got here: ', another);
  }
};