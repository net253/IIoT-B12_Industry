const express = require("express");
const router = express.Router();
const queryDB = require("./libs/b12-queryDB");

/* GET home page. */
router.get("/", (req, res) => {
  res.send({ message: "Welcome to B12 Hardware API." });
});

router.post("/received-pi", async (req, res) => {
  const { piName, piIP, data, datetimeNow, datetimeHours } = req.body;

  // Update IP RPi
  await queryDB(
    `UPDATE t_raspi_regis SET piIP='${piIP}' WHERE piName='${piName}'`
  );

  // Select data from RPi
  const {
    query: { recordset: piRegis },
  } = await queryDB(
    `SELECT areaNo, machineNo FROM t_raspi_regis WHERE piName='${piName}' ORDER BY piSlot ASC`
  );

  // Check Rpi regis
  if (piRegis.length > 0) {
    const chkPiRegis = piRegis
      .map(({ areaNo, machineNo }, index) => ({
        areaNo,
        machineNo,
        datetimeNow,
        datetimeHours,
        ...data[index],
      }))
      .filter(({ areaNo, machineNo }) => areaNo !== "" || machineNo !== "");

    chkPiRegis.map(async ({ areaNo, machineNo, status, counter }, index) => {
      // t_status_counter
      const {
        query: { recordset: oldStatusCounter },
      } = await queryDB(`SELECT TOP 1 status AS oldStatus, id AS lastIdStatusCounter FROM t_status_counter_logger 
        WHERE areaNo ='${areaNo}' AND machineNo ='${machineNo}' ORDER BY id DESC`);

      if (oldStatusCounter.length > 0) {
        const [{ oldStatus, lastIdStatusCounter }] = oldStatusCounter;
        if (oldStatus === status) {
          // UPDATE
          await queryDB(`UPDATE t_status_counter_logger
                  SET counter=counter+${counter} 
                  WHERE areaNo='${areaNo}' 
                  AND machineNo='${machineNo}' 
                  AND id=${lastIdStatusCounter}`);
        } else {
          // INSERT
          await queryDB(
            `INSERT INTO t_status_counter_logger VALUES ('${areaNo}','${machineNo}','${status}',${counter},'${datetimeNow}')`
          );
        }
      } else {
        // INSERT
        await queryDB(
          `INSERT INTO t_status_counter_logger VALUES ('${areaNo}','${machineNo}','${status}',${counter},'${datetimeNow}')`
        );
      }
      // ./t_status_counter

      // Job order v_jobs
      const {
        query: { recordset: dataStack },
      } = await queryDB(
        `SELECT jobID, datetimeHours AS datetimeOpenJob FROM v_jobs WHERE areaNo ='${areaNo}' AND machineNo ='${machineNo}'`
      );

      if (dataStack.length > 0) {
        const [{ datetimeOpenJob, jobID }] = dataStack;

        // t_raw_data
        const {
          query: { recordset: oldRawData },
        } = await queryDB(`SELECT TOP 1 status AS oldStatusRawData, id AS lastIdRawData FROM t_raw_data 
                        WHERE areaNo='${areaNo}' 
                        AND machineNo='${machineNo}' 
                        AND jobID='${jobID}' ORDER BY id DESC`);

        const sqlInsertRawData = `INSERT INTO t_raw_data VALUES ('${areaNo}','${machineNo}','${jobID}','${status}',${counter},'${datetimeNow}')`;
        if (oldRawData.length > 0) {
          const [{ oldStatusRawData, lastIdRawData }] = oldRawData;
          const sqlUpdateRawData = `UPDATE t_raw_data SET counter=counter+${counter} 
                                    WHERE areaNo='${areaNo}' AND machineNo='${machineNo}' AND id=${lastIdRawData}`;

          if (oldStatusRawData === status) {
            if (status === "Online" && counter !== 0) {
              // INSERT
              await queryDB(sqlInsertRawData);
            } else {
              // UPDATE
              await queryDB(sqlUpdateRawData);
            }
          } else {
            // INSERT
            await queryDB(sqlInsertRawData);
          }
        } else {
          // INSERT
          await queryDB(sqlInsertRawData);
        }
        // ./t_raw_data

        // t_raw_data_logger
        const {
          query: { recordset: dataLogger },
        } = await queryDB(`SELECT * FROM t_raw_data_logger 
                      WHERE areaNo='${areaNo}' 
                      AND machineNo='${machineNo}' 
                      AND jobID='${jobID}' 
                      AND datetime='${datetimeHours}'`);

        if (dataLogger.length > 0) {
          // UPDATE
          await queryDB(`UPDATE t_raw_data_logger SET counter=counter+${counter} 
                        WHERE areaNo ='${areaNo}' 
                        AND machineNo ='${machineNo}' 
                        AND jobID='${jobID}' 
                        AND datetime='${datetimeHours}'`);
        } else {
          // INSERT
          await queryDB(
            `INSERT INTO t_raw_data_logger VALUES ('${areaNo}','${machineNo}','${jobID}','${counter}','${datetimeHours}')`
          );
        }
        // ./t_raw_data_logger

        // t_area?
        await queryDB(`
            UPDATE t_area${areaNo} SET
            status='${status}',
            counter=(SELECT SUM(counter) FROM t_raw_data_logger 
            WHERE areaNo='${areaNo}' 
            AND machineNo='${machineNo}' 
            AND jobID='${jobID}' 
            AND datetime>='${datetimeOpenJob}:000')
            WHERE areaNo='${areaNo}' 
            AND machineNo='${machineNo}'
            `);
        // ./t_area?
      }
      // ./v_jobs
    });

    res.send({ state: true });
  } else {
    res.send({ state: false });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------
});

module.exports = router;
