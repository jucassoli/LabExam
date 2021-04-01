exports.isValidationError = (err) => {
  return err.err.errors && err.err.errors.status && err.err.errors.status.name == "ValidatorError"
};

exports.fixResponseData = (data) => {
  if(Array.isArray(data)) {
    data.forEach(item => fixSingle(item));
  } else {
    fixSingle(data);
  }
};

let fixSingle = (data) => {
  if(typeof data == "object") {
    if (data.hasOwnProperty('__v')) delete data.__v;
    if (data.hasOwnProperty('_id')) {
      let id = data._id;
      delete data._id;
      Object.assign(data, { id });
    }
  }
}