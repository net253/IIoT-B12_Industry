const express = require("express");
const router = express.Router();
const queryDB = require("./libs/b12-queryDB");

/* GET home page. */
router.get("/", (req, res) => {
  res.send({ message: "Welcome to B12 Hardware API." });
});

router.post("/receivedPi", (req, res) => {
  const { piName, piIP, data, datetimeNow, datetimeHours } = req.body;
  const sql = `UPDATE t_raspi_regis SET piIP='${piIP}' WHERE piName='${piName}'`;
  queryDB(sql).then(({ state }) => {
    // Check areaNo, machineNo is registered in table
    state
      ? queryDB(
          `SELECT areaNo, machineNo FROM t_raspi_regis WHERE piName='${piName}' ORDER BY piSlot ASC`
        ).then(({ query: { recordset } }) => {
          let chkPiRegis = recordset
            .map(({ areaNo, machineNo }, index) => ({
              areaNo,
              machineNo,
              datetimeNow,
              datetimeHours,
              ...data[index],
            }))
            .filter(
              ({ areaNo, machineNo }, index) =>
                areaNo !== "" || machineNo !== ""
            );
          // map data from table compare with stack job for pack data to insert to table
          chkPiRegis.map(({ areaNo, machineNo, status, counter }, index) => {
            queryDB(
              `SELECT * FROM v_jobs WHERE areaNo ='${areaNo}' AND machineNo ='${machineNo}'`
            ).then(({ state, query }) => {
              let dataStack = query.recordset;
              // Check row to insert or update counter and ststus
              if (dataStack.length > 0) {
                const [{ partNo, partName, jobID }] = dataStack;
                // START Function

                const insertLoggerTable = async () => {
                  const sqlInsert = `INSERT INTO t_raw_data_logger VALUES('${areaNo}','${machineNo}','${jobID}','${counter}','${datetimeHours}')`;
                  await queryDB(sqlInsert);
                };
                const updateLoggerTable = async () => {
                  sqlUpdateLogger = `UPDATE t_raw_data_logger SET counter=counter+'${counter}' 
                  WHERE areaNo ='${areaNo}' 
                  AND machineNo ='${machineNo}' 
                  AND jobID='${jobID}' 
                  AND datetime='${datetimeHours}'`;
                  await queryDB(sqlUpdateLogger);
                };
                const insertRawTable = async () => {
                  const sql = `INSERT INTO t_raw_data VALUES ('${areaNo}','${machineNo}','${jobID}','${status}',${counter},'${datetimeNow}')`;
                  await queryDB(sql);
                };
                const updateAreaTable = async () => {
                  const sqlv_jobs = `SELECT datetimeHours FROM v_jobs 
                  WHERE areaNo='${areaNo}' 
                  AND machineNo='${machineNo}' 
                  AND jobID='${jobID}'`;
                  await queryDB(sqlv_jobs).then(
                    ({ state, query: { recordset: v_data_jobs } }) => {
                      let datetimeH = v_data_jobs[0].datetimeHours+':000';
                      const sqlSelect = `SELECT SUM(counter) AS dataSumCounter FROM t_raw_data_logger 
                      WHERE areaNo ='${areaNo}' 
                      AND machineNo ='${machineNo}' 
                      AND jobID='${jobID}' 
                      AND datetime>='${datetimeH}'`;
                      queryDB(sqlSelect).then(async ({ state, query }) => {
                        let [{ dataSumCounter }] = query.recordset;
                        const sqlUpdate = `UPDATE t_area${areaNo} SET counter='${dataSumCounter}',status='${status}' 
                        WHERE areaNo ='${areaNo}' 
                        AND machineNo ='${machineNo}' 
                        AND jobID='${jobID}'`;
                        queryDB(sqlUpdate);
                      });
                    }
                  );
                };
                // // END Function
                // Raw_data_logger
                queryDB(
                  `SELECT * FROM t_raw_data_logger 
                  WHERE areaNo ='${areaNo}' 
                  AND machineNo ='${machineNo}' 
                  AND jobID='${jobID}' 
                  AND datetime='${datetimeHours}'`
                ).then(({ query }) => {
                  let dataLogger = query.recordset;
                  dataLogger.length > 0
                    ? updateLoggerTable().then(() => {
                        setTimeout(() => {
                          res.send({
                            state: true,
                            message: "Insert data sucessfully",
                          });
                        }, 500);
                        updateAreaTable();
                      })
                    : insertLoggerTable().then(() => {
                        setTimeout(() => {
                          res.send({
                            state: true,
                            message: "Insert data sucessfully"
                          });
                        }, 500);
                        updateAreaTable();
                      });
                });

                // Raw_data
                queryDB(
                  `SELECT TOP 1 status AS oldStatus FROM t_raw_data 
                  WHERE areaNo ='${areaNo}' 
                  AND machineNo ='${machineNo}' 
                  AND jobID='${jobID}' ORDER BY id DESC`
                ).then(({ query }) => {
                  let dataRaw = query.recordset;
                  if (dataRaw.length > 0) {
                    let [{ oldStatus }] = dataRaw;
                    if (oldStatus == status) {
                      if (status == "Online" && counter != 0) {
                        insertRawTable();
                      }
                    } else {
                      insertRawTable();
                    }
                  } else {
                    insertRawTable();
                  }
                });
              } else {
                res.send({ msg: "Production order haven't assigned yet!" });
              }
            });
            // Insert status_counter_logger
            let sqlStatusCounter = `SELECT TOP 1 status AS oldStatus FROM t_status_counter_logger 
            WHERE areaNo ='${areaNo}' 
            AND machineNo ='${machineNo}' ORDER BY id DESC`;
            queryDB(sqlStatusCounter).then(({ state, query }) => {
              const insertStatusCounterLogger = async () => {
                const sql = `INSERT INTO t_status_counter_logger VALUES ('${areaNo}','${machineNo}','${status}',${counter},'${datetimeNow}')`;
                queryDB(sql);
              };
              const updateStatusCounterLogger = async () => {
                const sql = `UPDATE t_status_counter_logger
                            SET  counter=counter+'${counter}' 
                            WHERE areaNo='${areaNo}' 
                            AND machineNo='${machineNo}' 
                            AND id=(SELECT TOP 1 id FROM t_status_counter_logger ORDER BY id DESC)`;
                queryDB(sql);
              };
              let dataLogger = query.recordset;
              if (dataLogger.length > 0) {
                let [{ oldStatus }] = dataLogger;
                if (oldStatus == status) {
                  if (status == "Online" && counter != 0) {
                    updateStatusCounterLogger();
                  }
                } else {
                  insertStatusCounterLogger();
                }
              } else {
                insertStatusCounterLogger();
              }
            });
          });
        })
      : res.send({ msg: false });
  });
});

module.exports = router;
