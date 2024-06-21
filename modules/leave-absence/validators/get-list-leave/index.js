const q = require("q");
const Joi = require("joi");

const validateSchema = Joi.object({
  page: Joi.number().optional().default(1),
  limit: Joi.number().optional().default(50),
});

module.exports = async (body) => {
  const defer = q.defer();
  const result = validateSchema.validate(body, {
    stripUnknown: true,
  });

  if (result.error) {
    log.error("[VALIDATION][EXECEPTION][Get List Leave] error:", result.error);
    defer.resolve({ error: result.error.message });
  } else {
    defer.resolve(result.value);
  }

  return defer.promise;
};

