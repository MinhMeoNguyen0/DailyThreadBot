module.exports = async (job_key, data, priority = 3, ttl = 3600000) => {
  await queue.add(job_key, data, {
    removeOnComplete: true,
    removeOnFail: true,
    timeout: ttl
  });
  return;
};
