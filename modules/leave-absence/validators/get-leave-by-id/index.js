const q = require("q");
const Joi = require("joi");

const validateSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = async (body) => {
  const defer = q.defer();
  const result = validateSchema.validate(body, {
    stripUnknown: true,
  });

  if (result.error) {
    log.error("[VALIDATION][EXECEPTION][Get Leave By Id] error:", result.error);
    defer.resolve({ error: result.error.message });
  } else {
    defer.resolve(result.value);
  }

  return defer.promise;
};

