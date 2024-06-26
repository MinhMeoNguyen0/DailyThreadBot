const q = require("q");
const Joi = require("joi");

const validateSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  description: Joi.string().required(),
  periodStartDate: Joi.date().required(),
  periodEndDate: Joi.date().required(),
});

module.exports = async (body) => {
  const defer = q.defer();
  const result = validateSchema.validate(body, {
    stripUnknown: true,
  });

  if (result.error) {
    log.error("[VALIDATION][EXECEPTION][Add New Thread] error:", result.error);
    defer.resolve({ error: result.error.message });
  } else {
    defer.resolve(result.value);
  }

  return defer.promise;
};

