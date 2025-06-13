/**
 * The function checks if the `name` and `description` properties
 * are defined and of type string, returning an array of error messages if validation fails.
 * @param body - The function takes an object `body` as a parameter. This object is
 * expected to have `name` and `description` properties.
 * @returns The function returns an array of error messages based on the validation
 * rules for the `name` and `description` properties in the `body` object.
 */
const validateProduct = (body, isPartial = false) => {
  const errors = [];

  if (!isPartial || "name" in body) {
    if (body.name === undefined) {
      errors.push("'name' is required");
    } else if (typeof body.name !== "string") {
      errors.push("'name' must be a string");
    } else {
      if (body.name.length < 4) {
        errors.push("'name' must be at least 4 characters long");
      }

      if (body.name.length > 45) {
        errors.push("'name' must be at most 45 characters long");
      }
    }

  }

  if (!isPartial || "description" in body) {
    console.log(body.description);
    if (body.description === undefined) {
      errors.push("'description' is required");
    } else if (typeof body.description !== "string") {
      errors.push("'description' must be a string");
    } else {
      if (body.description.length < 7) {
        errors.push("'description' must be at least 7 characters long");
      }

      if (body.description.length > 255) {
        errors.push("'description' must be at most 255 characters long");
      }
    }

  }

  return errors;
};

module.exports = { validateProduct };
