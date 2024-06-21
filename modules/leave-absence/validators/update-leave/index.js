const q = require("q");
const Joi = require("joi");

const config = include("common/config/");

const validateSchema = Joi.object({
  // id: Joi.string().required(),
  // name: Joi.string(),
  // desc: Joi.string(),
});

module.exports = async (body) => {
  const defer = q.defer();
  const result = validateSchema.validate(body, {
    stripUnknown: true,
  });

  if (result.error) {
    log.error("[VALIDATION][EXECEPTION][Update Leave] error:", result.error);
    defer.resolve({ error: result.error.message });
  } else {
    defer.resolve(result.value);
  }

  return defer.promise;
};
