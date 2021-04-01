exports.isValidationError = (err) => {
  return err.err && err.err.errors && err.err.errors.status && err.err.errors.status.name == "ValidatorError"
};

exports.fixResponseData = (data) => {
  if(Array.isArray(data)) {
    for(i=0; i<data.length; i++) {
      data[i] = fixSingle(data[i]);
    }
    return data;
  }
  return fixSingle(data);
};

let fixSingle = (data) => {
  let trueData = (data.toObject)? data.toObject(): data;
  let another = {
    ...trueData
  };
  if (another.__v !== undefined) delete another.__v;
  if (another._id) {
    let id = another._id;
    delete another._id;
    Object.assign(another, { id });
  }

  return another;
};