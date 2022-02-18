const lineNotify = require("./lineNotify");
const fdatetime = require("./fdatetime");

const lineCloseJob = async ({
  jobID,
  mainPartNo,
  subPartNo,
  target,
  counter,
  ng = 0,
  startDate,
  endDate,
  user = "Admin",
  urlReport = "",
}) => {
  const data = await lineNotify(`
  JOB ID : ${jobID}
  MAIN PART NO : ${mainPartNo}
  SUB PART NO: ${subPartNo}
  TARGET : ${target}
  COUNTER : ${counter}
  NG : ${ng}
  START DATE : ${fdatetime(startDate).getFDate}
  END DATE : ${fdatetime(endDate).getFDate}
  ACTION : CLOSED
  ACTION BY : ${user}
  REPORT LINK  : ${urlReport}
  `);

  return data;
};

const lineOpenJob = async ({
  jobID,
  mainPartNo,
  subPartNo,
  target,
  startDate,
  endDate,
  user = "Admin",
}) => {
  const data = await lineNotify(`
JOB ID : ${jobID}
MAIN PART NO : ${mainPartNo}
SUB PART NO: ${subPartNo}
TARGET : ${target}
START DATE : ${fdatetime(startDate).getFDate}
END DATE : ${fdatetime(endDate).getFDate}
ACTION : OPENED
ACTION BY : ${user}
`);

  return data;
};

const lineCancelJob = async ({
  jobID,
  mainPartNo,
  subPartNo,
  target,
  counter,
  ng = 0,
  startDate,
  endDate,
  user = "Admin",
  urlReport = "",
}) => {
  const data = await lineNotify(`
  JOB ID : ${jobID}
  MAIN PART NO : ${mainPartNo}
  SUB PART NO: ${subPartNo}
  TARGET : ${target}
  COUNTER : ${counter}
  NG : ${ng}
  START DATE : ${fdatetime(startDate).getFDate}
  END DATE : ${fdatetime(endDate).getFDate}
  ACTION : CANCEL
  ACTION BY : ${user}
  REPORT LINK  : ${urlReport}
  `);

  return data;
};

module.exports = { lineOpenJob, lineCloseJob,lineCancelJob };
