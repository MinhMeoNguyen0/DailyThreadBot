const q = require("q");
const Joi = require("joi");

const validateSchema = Joi.object({
  search: Joi.string().optional().allow("").allow(null).default(null),
});

module.exports = async (body) => {
  const defer = q.defer();
  const result = validateSchema.validate(body, {
    stripUnknown: true,
  });

  if (result.error) {
    log.error("[VALIDATION][EXECEPTION][Get All Leaveveve] error:", result.error);
    defer.resolve({ error: result.error.message });
  } else {
    defer.resolve(result.value);
  }

  return defer.promise;
};
