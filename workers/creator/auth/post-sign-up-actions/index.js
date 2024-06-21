const createJob = include("workers/creator/create-job");
const workerConstants = include("workers/constants");
module.exports = async data => {
  let postSignUpActions = await createJob(
    workerConstants.AUTH_POST_SIGN_UP_ACTIONS,
    data
  );
  return postSignUpActions;
};
