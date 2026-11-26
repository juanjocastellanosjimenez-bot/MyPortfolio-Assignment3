const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else if (err.name === "CastError") {
    message = `Invalid id: ${err.value}`;
  } else if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  } else {
    message = err.message || "Something went wrong";
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0];
    output = field
      ? field.charAt(0).toUpperCase() + field.slice(1) + " already exists"
      : "Unique field already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

export default { getErrorMessage };
