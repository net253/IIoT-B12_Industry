const mssql = require("mssql");
const config = require("./b12-dbconfig");

// const queryDB = async (sql) => {
//   try {
//     const pool = await mssql.connect(config);
//     const query = await pool.request().query(sql);
//     return { state: true, query };
//   } catch (err) {
//     console.log(err);
//     return { state: false, query: {} };
//   }
// };

const queryDB = (sql) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await mssql.connect(config);
      const query = await pool.request().query(sql);
      resolve({ state: true, query });
    } catch (err) {
      console.log(err);
      reject({ state: false, query: {} });
    }
  });
};

module.exports = queryDB;
