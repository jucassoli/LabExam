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
  console.log('--> Data begin: ', data);
  console.log('--> Data type: ', typeof data);
  
  console.log('--> has data.hasOwnProperty __v', data.hasOwnProperty('__v'));
  console.log('--> has data.hasOwnProperty _id', data.hasOwnProperty('_id'));

  if (data.hasOwnProperty('__v')) delete data.__v;
  if (data.hasOwnProperty('_id')) {
    let id = data._id;
    delete data._id;
    Object.assign(data, { id });
    console.log('---- got here: ', data);
  }
};