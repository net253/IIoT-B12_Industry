const axios = require("axios");
const express = require("express");
const router = express.Router();
const queryDB = require("./libs/b12-queryDB");
const {
  lineOpenJob,
  lineCloseJob,
  lineCancelJob,
} = require("./libs/lineActions");
const sapData = require("./data/sap.json");
const fdatetime = require("./libs/fdatetime");

//Get Home Page
router.get("/", (req, res) => {
  res.send({ message: "Welcome to B12 Web API." });
});

// Show Data Machine
router.get("/machine-info/:areaNo/:machineNo", (req, res) => {
  const { areaNo, machineNo } = req.params;
  const sql = `SELECT * FROM v_pip_all_area_jobs WHERE areaNo = '${areaNo}' AND machineNo = '${machineNo}'`;
  queryDB(sql).then(({ query: { recordset } }) => {
    recordset.length > 0 ? res.send(recordset) : res.send([]);
  });
});


// Show All Job
router.get("/all-jobs", (req, res) => {
  // const sql = `SELECT * FROM v_pip_jobs`;
  const sql = `SELECT * FROM v_pip_all_area_jobs WHERE jobID!=''`;
  queryDB(sql).then(({ state, query: { recordset } }) => {
    state ? res.send(recordset) : res.send([]);
  });
});

// OpenedJobs SAP
router.post("/found-bom-part", (req, res) => {
  const mainPartNo = req.body.mainPartNo;
  const sql = `SELECT subPartNo, subPartName FROM t_pip_bom_part 
     WHERE mainPartNo = '${mainPartNo}'`;
  queryDB(sql).then(({ state, query: { recordset } }) => {
    state ? res.send(recordset) : res.send([]);
  });
});

// OpenJobs
router.post("/open-jobs", (req, res) => {
  const {
    areaNo,
    machineNo,
    jobID,
    mainPartNo,
    subPartNo,
    startDate,
    endDate,
    target,
  } = req.body;
  queryDB(
    `SELECT * FROM v_pip_jobs WHERE areaNo='${areaNo}' AND machineNo='${machineNo}'`
  ).then(({ state, query: { recordset } }) => {
    if (!state) return res.send({ state, msg: "ERROR." });
    if (recordset.length > 0) {
      return res.send({ state: false, msg: "EXIT JOBS." });
    } else {
      const datetimeStamp = fdatetime(new Date()).getFDatetime;
      queryDB(`
            INSERT INTO t_pip_stack_jobs VALUES ('${areaNo}','${machineNo}','${jobID}','${datetimeStamp}');

            INSERT INTO t_pip_jobs_logger VALUES ('${areaNo}','${machineNo}','${jobID}','${mainPartNo}','${subPartNo}','${startDate}','${endDate}','${target}','0','','','${datetimeStamp}','Opened');

            `).then(({ state }) => {
        res.send({ state, msg: "Opened." });
        lineOpenJob({
          jobID,
          mainPartNo,
          subPartNo,
          target,
          startDate,
          endDate,
        });
      });
    }
  });
});

// Edit Jobs
router.post("/edit-jobs", (req, res) => {
  const { areaNo, machineNo, jobID, target } = req.body;
  const datetimeStamp = fdatetime(new Date()).getFDatetime;
  queryDB(`SELECT * FROM t_pip_stack_jobs WHERE areaNo='${areaNo}' AND machineNo='${machineNo}' AND jobID='${jobID}'
    `).then(({ state, query: { recordset } }) => {
    if (!state) return res.send({ state, msg: "Error." });
    if (recordset.length === 0) {
      return res.send({ state: false, msg: "Not Job." });
    } else {
      queryDB(`
            UPDATE t_pip_stack_jobs SET jobID='${jobID}', datetime='${datetimeStamp}' 
            WHERE areaNo='${areaNo}' AND machineNo='${machineNo}'
            
            UPDATE t_pip_jobs_logger SET target='${target}', datetime='${datetimeStamp}'
            WHERE id=(SELECT TOP (1) id FROM t_pip_jobs_logger
            WHERE areaNo='${areaNo}'
            AND machineNo='${machineNo}'
            AND action='Opened'
            ORDER BY id DESC);
            `).then(({ state }) => res.send({ state, msg: "Edit complete" }));
    }
  });
});

// Closed Jobs
router.post("/closed-jobs", (req, res) => {
  const {
    areaNo,
    machineNo,
    jobID,
    mainPartNo,
    subPartNo,
    startDate,
    endDate,
    target,
    counter,
    nextProcess,
    ng,
  } = req.body;

  const totalNG = JSON.parse(ng).total ?? 0;
  const datetimeStamp = fdatetime(new Date()).getFDatetime;
  queryDB(
    `SELECT * FROM v_pip_jobs 
        WHERE areaNo='${areaNo}' 
        AND machineNo='${machineNo}' 
        AND jobID='${jobID}';`
  ).then(({ state, query: { recordset } }) => {
    if (!state) return res.send({ state, msg: "Error." });
    if (recordset.length === 0) {
      return res.send({ state: false, msg: "Not Jobs." });
    } else {
      queryDB(`DELETE FROM t_pip_stack_jobs
                WHERE areaNo='${areaNo}'
                AND machineNo='${machineNo}'
                AND jobID='${jobID}'

                INSERT INTO t_pip_jobs_logger VALUES
                ('${areaNo}','${machineNo}','${jobID}','${mainPartNo}','${subPartNo}','${startDate}','${endDate}','${target}',
                '${counter}','${nextProcess}','${ng}','${datetimeStamp}','Closed');

                UPDATE t_pip_area${areaNo} SET counter=0 WHERE areaNo='${areaNo}' AND machineNo='${machineNo}';
                `).then(({ state }) => {
        res.send({ state, msg: "Closed." });
        lineCloseJob({
          jobID,
          mainPartNo,
          subPartNo,
          target,
          counter,
          ng: totalNG,
          startDate,
          endDate,
        });
      });
    }
  });
});

// Control Start Stop
router.post("/control-machine", (req, res) => {
  const { areaNo, machineNo, stateControl, secureCode } = req.body;
  if (secureCode == "admin") {
    queryDB(`
          SELECT piIP, piSlot FROM t_pip_raspi_regis WHERE areaNo='${areaNo}' AND machineNo='${machineNo}'
          `).then(({ state, query: { recordset } }) => {
      if (!state) return res.send({ state, msg: "Error." });
      if (recordset.length === 0) {
        return res.send({ state: false, msg: "Not Data" });
      } else {
        const [{ piIP, piSlot }] = recordset;
        const rountingPiIP = `http://${piIP}:1880/control-machine`;
        const triggerPi = async () => {
          try {
            const fetchData = await axios.post(rountingPiIP, {
              piSlot,
              state: stateControl,
            });
            const data = fetchData.data;
            if (data) {
              return res.send({ state: true, msg: "Trigged." });
            } else {
              setTimeout(() => {
                return res.send({ state: false, msg: "Trigger failed." });
              }, 1500);
            }
          } catch (err) {
            return res.send(err.message);
          }
        };
        triggerPi();
      }
    });
  } else {
    return res.send({ state: false, msg: "Password is incorrect." });
  }
});

// Sap
router.get("/sap", async (req, res) => {
  // res.send(sapData)
  const fSapDate = (dt) => {
    if (dt?.length != 8) return null;
    return `${dt.slice(0, 4)}-${dt.slice(4, 6)}-${dt.slice(6)}`;
  };

  try {
    const rs = await axios.get(
      "http://3.1.29.26/iot/api/snc-pd-order-api.php?StartDate=20211215&EndDate=20211215&BU=B12"
    );

    // res.send(rs.data);

    res.send(
      rs.data.map((info) => ({
        ...info,
        ORDER_ID:
          info.ORDER_ID.length > 10 ? info.ORDER_ID.slice(2) : info.ORDER_ID,
        CREATEDATE: fSapDate(info.CREATEDATE),
        STARTDATE: fSapDate(info.STARTDATE),
        ENDDATE: fSapDate(info.ENDDATE),
      }))
    );
  } catch (err) {
    res.send([]);
  }
});

// Show Process // Edit view
router.get("/process-jobs/:process", (req, res) => {
  const { process } = req.params;
  queryDB(
    `SELECT * FROM v_pip_all_area_jobs WHERE process='${process}' AND jobID!=''`
  ).then(({ state, query: { recordset } }) => {
    res.send(recordset.length > 0 ? recordset : []);
  });
});

//Cancel
router.post("/cancel-jobs", (req, res) => {
  const {
    areaNo,
    machineNo,
    jobID,
    mainPartNo,
    subPartNo,
    startDate,
    endDate,
    target,
    counter,
    nextProcess,
    ng,
  } = req.body;
  const datetimeStamp = fdatetime(new Date()).getFDatetime;
  queryDB(
    `SELECT * FROM v_pip_jobs 
        WHERE areaNo='${areaNo}' 
        AND machineNo='${machineNo}' 
        AND jobID='${jobID}';`
  ).then(({ state, query: { recordset } }) => {
    if (!state) return res.send({ state, msg: "Error." });
    if (recordset.length === 0) {
      return res.send({ state: false, msg: "Not Jobs." });
    } else {
      queryDB(`
                DELETE FROM t_pip_stack_jobs
                WHERE areaNo='${areaNo}'
                AND machineNo='${machineNo}'
                AND jobID='${jobID}';

                INSERT INTO t_pip_jobs_logger VALUES
                ('${areaNo}','${machineNo}','${jobID}','${mainPartNo}','${subPartNo}','${startDate}','${endDate}','${target}',
                '${counter}','${nextProcess}','${ng}','${datetimeStamp}','Cancel');

                UPDATE t_pip_area${areaNo} SET counter=0 WHERE areaNo='${areaNo}' AND machineNo='${machineNo}';
                `).then(({ state }) => {
        res.send({ state, msg: "Cancel." });
        lineCancelJob({
          jobID,
          mainPartNo,
          subPartNo,
          target,
          counter,
          ng,
          startDate,
          endDate,
        });
      });
    }
  });
});

router.post("/report-jobs", (req, res) => {
  // all, finished, inprocess
  const { mode } = req.body;
  let sql = "SELECT * FROM v_pip_all_report";
  if (mode === "finished") {
    sql += " WHERE action!='Opened'";
  } else if (mode === "inprocess") {
    sql += " WHERE action='Opened'";
  } else {
    sql += "";
  }
  sql += " ORDER BY datetime DESC";
  queryDB(sql).then(({ state, query: { recordset } }) => {
    state ? res.send(recordset) : res.send([]);
  });
});

//Report-Search
router.post("/report-search", (req, res) => {
  const { search } = req.body;
  const sql = `SELECT * FROM  v_pip_all_report WHERE mainPartNo LIKE '%${search}%' ORDER BY datetime DESC`;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset);
  });
});

//NG Case
router.post("/ng-case", (req, res) => {
  const { process } = req.body;
  queryDB(`
    SELECT * FROM t_pip_ng_case WHERE process='${process}'
  `).then(({ state, query: { recordset } }) => {
    res.send(recordset.length > 0 ? recordset : []);
  });
});

//Graph Hour
router.post("/graph-hour", (req, res) => {
  const { areaNo, machineNo, jobID, datetime } = req.body;
  const sql = `SELECT areaNo, machineNo, jobID, counter , CONVERT(varchar,datetime,120) AS datetime 
    FROM  t_pip_raw_data_logger WHERE areaNo='${areaNo}' AND machineNo='${machineNo}' 
    AND jobID='${jobID}' AND datetime BETWEEN '${datetime} 00:00:00' AND '${datetime} 23:59:59' order by datetime ASC`;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset);
  });
});

//Graph Hour Total
router.post("/chart-hour", (req, res) => {
  const { areaNo, machineNo, jobID, datetimeStart, datetimeEnd } = req.body;
  let sql = `SELECT SUM(counter) AS counter FROM t_pip_raw_data_logger 
                WHERE areaNo = '${areaNo}' 
                AND machineNo = '${machineNo}' 
                AND  jobID = '${jobID}' 
                AND datetime >= '${datetimeStart}'`;
  if (datetimeEnd) sql += `AND datetime <= '${datetimeEnd}'`;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset.length > 0 ? recordset : []);
  });
});

//Show All Machine
router.get("/all-machine", (req, res) => {
  const sql = `SELECT *, CONVERT(varchar,startDate,120) AS cStartDate, CONVERT(varchar,endDate,120) AS cEndDate FROM v_pip_all_area_jobs`;
  queryDB(sql).then(({ state, query: { recordset } }) => {
    state ? res.send(recordset) : res.send([]);
  });
});

//Show Actual Overview
router.get("/all-status-counter", (req, res) => {
  const sql = "SELECT * FROM v_pip_all_status_counter";
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(
      recordset.length > 0
        ? [recordset[2], recordset[0], recordset[3], recordset[1], recordset[4]]
        : []
    );
  });
});

//update acknowledge-notified.
router.post("/acknowledge-notified", (req, res) => {
  const { piName, datetime } = req.body;
  console.log({ piName, datetime });
  const sql = `UPDATE t_pip_devices_notification SET status='acknowledge' WHERE piName='${piName}' AND CONVERT(varchar, datetime, 20)='${datetime}';`;
  queryDB(sql).then(({ state }) => res.send({ state, msg: "acknowledge." }));
});

//device-monitor
router.get("/iot-devices-monitor", async (req, res) => {
  try {
    const {
      state,
      query: { recordset },
    } = await queryDB(
      "SELECT * FROM v_all_machine_monitor_meter ORDER BY piIP ASC"
    );

    if (!state) return res.send([]);
    return res.send(recordset);
  } catch (err) {
    return res.send([]);
  }
});

//device-notify
router.get("/devices-notify-report", async (req, res) => {
  try {
    const {
      state,
      query: { recordset },
    } = await queryDB(
      "SELECT *, CONVERT(varchar, datetime, 20) AS fdatetime FROM t_pip_devices_notification ORDER BY datetime DESC"
    );

    if (!state) return res.send([]);
    return res.send(recordset);
  } catch (err) {
    return res.send([]);
  }
});

//Graph Timeline Machine
router.post("/timeline-machine", (req, res) => {
  const { areaNo, machineNo, datetime } = req.body;
  const sql = `SELECT areaNo, machineNo, machineName, status , CONVERT(varchar,datetime,120) AS datetime 
    FROM  v_pip_status_machine WHERE areaNo='${areaNo}' 
    AND machineNo='${machineNo}' AND datetime BETWEEN '${datetime} 00:00:00' AND '${datetime} 23:59:59' order by datetime ASC`;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset);
  });
});

//Graph Total
router.post("/graph-total", (req, res) => {
  const { areaNo, machineNo, jobID, startDate, endDate } = req.body;
  const sql = `SELECT * FROM  t_pip_raw_data_logger  WHERE areaNo='${areaNo}' 
  AND machineNo='${machineNo}' AND jobID='${jobID}' AND datetime BETWEEN '${startDate}' AND '${endDate}' order by datetime ASC`;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset);
  });
});

//Reset Database
router.post("/reset-database", (req, res) => {
  // const { database } = req.body;
  const sql = `ALTER DATABASE IoT_B12
  SET RECOVERY SIMPLE;

  DBCC SHRINKFILE (IoT_B12, 50);
  
  ALTER DATABASE IoT_B12
  SET RECOVERY FULL;
  `;
  queryDB(sql).then(({ query: { recordset } }) => {
    res.send(recordset);
  });
});

module.exports = router;
