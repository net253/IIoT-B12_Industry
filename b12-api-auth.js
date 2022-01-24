const express = require("express");
const router = express.Router();
const queryDB = require("./libs/b12-queryDB");
const bcrypt = require("bcrypt");

router.post("/checkLogin", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const sql = `SELECT * FROM t_accounts WHERE username ='${username}'`;
  queryDB(sql).then(({ query: { recordset } }) => {
    console.log(recordset);
    if (recordset.length > 0) {
      const [{ password: hashPass, name, status }] = recordset;

      if (status === "online") {
        return res.send({ state: false, msg: "You are currently login." });
      } else {
        bcrypt.compare(password, hashPass).then((state) => {
          return res.send({
            state,
            msg: state
              ? "You are successfully login."
              : "Password is incorrect.",
            name,
            username,
          });
        });
      }
    } else {
      return res.send({
        state: false,
        msg: "Youe account haven't registeration yet.",
      });
    }
  });
});

router.post("/userRegister", (req, res) => {
  const { name, username, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hash) => {
      const sql = `INSERT INTO t_accounts VALUES ('${name}', '${username}', '', '${hash}', 'admin', 'Logout')`;
      queryDB(sql).then(({ state }) =>
        res.send({ msg: "Successfully.", hash, state })
      );
    })
    .catch((err) => {
      if (err) throw err;
    });
});

router.post("/recheckAuth", (req, res) => {
  const { username } = req.body;
  if (req.session?.isLoggedIn) {
    res.send({ state: true, name: req.session?.name });
  } else {
    const sql = `UPDATE t_accounts SET status='offline' WHERE username='${username}'`;
    queryDB(sql).then(() => res.send({ state: false }));
  }
});

router.post("/logout", (req, res) => {
  const { user } = req.body;
  //session destroy
  const sql = `UPDATE t_accounts SET status='offline' WHERE name='${user}'`;
  queryDB(sql);
  // req.session = null;
  // res.redirect("/");
  res.send({ state: true });
});

module.exports = router;
