// const q = require("q");
// module.exports = async (job_key, data, priority = 3, ttl = 3600000) => {
//   let scheduleDate;
//   const defer = q.defer();
//   if (data.date instanceof Date) {
//     scheduleDate = data.date;
//   } else {
//     scheduleDate = new Date(data.date);
//   }
//   let now = new Date().getTime();
//   let scheduled = scheduleDate.getTime();
//   let delay = scheduled - now;

//   const myQueue = queue.add(job_key, data, {
//     delay: delay,
//     priority: priority,
//     removeOnComplete: true,
//     removeOnFail: true,
//     timeout: ttl
//   });
//   defer.resolve(myQueue);
//   return defer.promise;
// };
