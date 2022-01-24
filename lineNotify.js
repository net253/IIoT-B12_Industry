const axios = require("axios");
const qs = require("qs");

const token = "z6JDWjLul9bBP9sYfZ28PGUTT2QHARSRfgG26RrcKDN";

const lineNotify = async (message) => {
  const response = await axios({
    method: "post",
    url: "https://notify-api.line.me/api/notify",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    data: qs.stringify({
      message,
    }),
  });

  return response.data;
};

module.exports = lineNotify;
