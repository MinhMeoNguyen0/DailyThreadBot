const q = require("q");
const errorsCodes = include("modules/error/codes");
const errorsMessages = include("modules/error/messages");
const _ = require("lodash");
const moment = require("moment");
module.exports = async (params, validator, repository, cacheService) => {
  const defer = q.defer();
  const { query } = params;
  try {
    const validResult = await validator.validateGetListLeaveByMonthData(query);
    if (validResult.error) {
      defer.resolve({
        error: "VALIDATION_ERROR",
        message: validResult.error,
        code: 400,
      });
      return defer.promise;
    }
    let { month,year } = query;
    month = month? month : new Date().getMonth();
    year = year ? _.lowerCase(year) : new Date().getFullYear();
  

    const startDate = new Date(year, month, 1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);
  
    
    const queryObject = {
      $or: [
        {
          periodStartDate: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString()
          }
        },
        {
          periodEndDate: {
            $gte:startDate.toISOString(),
            $lte: endDate.toISOString()
          }
        }
      ]
    }

    const data = await repository.getAllLeave({queryObject});
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const absencesByDay = new Array(daysInMonth).fill([]);
    data.data.forEach((absence) => {
      const sD = new Date(absence.periodStartDate);
      const eD = new Date(absence.periodEndDate);
      const dn = absence.duration || 1;
      for (let i = 0; i < dn; i++) {
            const day = new Date(sD);
            day.setDate(sD.getDate() + i);
            if (
              (day.getMonth() === startDate.getMonth() && day.getDate() >= 1 && day.getDate() <= daysInMonth) ||
              (i === 0 && startDate.getMonth() !== eD.getMonth())
            ) {
              absencesByDay[day.getDate() - 1] = [...absencesByDay[day.getDate() - 1], absence];
            }
      }
    });


    
      



    
  
    
    defer.resolve({...absencesByDay});
  } catch (err) {
    log.error("[SERVICE][EXECEPTION][Get Leave List by Month ] error", err);
    const { error, code } = errorsCodes.SERVER_ERROR;
    defer.resolve({
      error,
      message: errorsMessages.SERVER_ERROR,
      code,
    });
    return defer.promise;
  }
  return defer.promise;
};

// const getListLeave = require("./get-list-leave");
