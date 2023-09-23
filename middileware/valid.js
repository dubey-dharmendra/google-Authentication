exports.validate = (schema, userData) => {
 const { error } = schema.validate(userData);
 if (error) throw new Error(error.details[0].message);
};