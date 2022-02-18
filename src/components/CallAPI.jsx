import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import { updateAllMCInfo } from "../store/slices/allMCSlice";
import { updateSapOrder } from "../store/slices/sapSlice";

export default function CallAPI() {
  const dispatch = useDispatch();
  // const history = useHistory();

  // const auth = useSelector((state) => state.auth);

  //   Get machine info
  const getAllMachineInfo = () => {
    axios
      .get("http://localhost:5012/b12apiweb/allMachineInfo")
      .then(({ data }) => {
        // console.log(data);
        dispatch(updateAllMCInfo(data));
      });
  };

  const getSAPOrder = () => {
    axios.get("http://localhost:5012/b12apiweb/sap").then(({ data }) => {
      // console.log(data);
      dispatch(updateSapOrder(data));
    });
  };

  // const recheckAuth = () => {
  //   axios
  //     .post("http://localhost:5012/b12apiweb/recheck", { ...auth })
  //     .then(({ data }) => {
  //       if (data.state) {
  //         history.push("/");
  //       }
  //     });
  // };

  useEffect(() => {
    const initPage = setTimeout(() => {
      getAllMachineInfo();
      getSAPOrder();
    }, 100);

    const timer5s = setInterval(() => {
      getAllMachineInfo();
      // recheckAuth();
    }, 5000);

    return () => {
      clearTimeout(initPage);
      clearInterval(timer5s);
    };
  }, []);

  return <></>;
}
