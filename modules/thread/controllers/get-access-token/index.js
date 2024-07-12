const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");

module.exports = async (req, res, service) => {
  try {
    
      const user = await service.addNewProfile();
      return res.status(200).json({ user});
  } catch (err) {
    const { code, error } = errorsCodes.SERVER_ERROR;
    return res.status(code).json({
      error,
      message: errorsMessages.SERVER_ERROR,
    });
  }
} ;
