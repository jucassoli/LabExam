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

  console.log('--> Data undef: ', data.__v !== undefined);

  if (data.__v !== undefined) delete data.__v;

  console.log('--> Data has id: ', data._id && true);

  if (data._id) {
    let id = data._id;
    delete data._id;
    Object.assign(data, { id });
    console.log('---- got here: ', data);
  }
};