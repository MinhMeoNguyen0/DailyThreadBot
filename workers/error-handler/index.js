const slackService = include("modules/slack-webhook/service");

module.exports = async (err, job, done, jobName) => {
  slackService.reportQueueFail(jobName, job, err);
  log.error(`[JOB-FAILED] with id ${job.id}`, err);
  done(err);
};
