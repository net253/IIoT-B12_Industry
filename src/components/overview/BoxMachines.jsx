import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Row, Col, Modal, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { AssignJobModal, CloseJobModal, EditJobModal } from "../modals";
import { useSelector, useDispatch } from "react-redux";

import { updateMachineInfo } from "../../store/slices/mcInfoSlice";

export default function BoxMachines({ machieName, machines }) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showCloseJob, setShowCloseJob] = useState(false);

  const machineInfo = useSelector((state) => state.machineInfo);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (info) => {
    setShow(true);
    dispatch(updateMachineInfo(info));
  };

  const handleShowEdit = () => setShowEdit(true);
  const handleShowAssign = () => setShowAssign(true);
  const handleShowCloseJob = () => setShowCloseJob(true);

  const controlMachine = (data, stateControl) => {
    const { areaNo, machineNo } = data;
    setShow(false);
    console.log(areaNo, machineNo, stateControl);
    Swal.fire({
      title: `คุณต้องการ ${stateControl} เครื่องจักรหรือไม่?`,
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirm",
      // showLoaderOnConfirm: true,
    }).then(({ isConfirmed, value }) => {
      setShow(true);
      if (isConfirmed) {
        axios
          .post("http://localhost:5012/b12apiweb/controlMC", {
            areaNo,
            machineNo,
            stateControl,
            secureCode: value,
          })
          .then(({ data }) => {
            if (data.state) {
              Swal.fire({
                icon: "success",
                title: `${stateControl.toUpperCase()} สำเร็จ`,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${stateControl.toUpperCase()} ไม่สำเร็จ`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

        // Swal.fire({
        //   title: `${machineInfo.status}`,
        // });
      }
    });
  };

  const percentage = (machineInfo?.counter / machineInfo?.target) * 100;

  return (
    <>
      <div className="d-flex">
        {machines.map((machine, index) => (
          <div key={index} className="pt-5 px-2">
            <div className="box-machine" onClick={() => handleShow(machine)}>
              {/* <div className="box-profile"></div> */}
              <img
                src={`images/machines/${machieName}.png`}
                className="img-fluid w-75"
              />
              {/* blink_status */}
              <div
                className={`w-75 badge bg-${
                  machine.status === "Online"
                    ? "success"
                    : machine.status === "Alarm"
                    ? "warning blink-status"
                    : machine.status === "Stop"
                    ? "danger blink-status"
                    : "secondary"
                }`}
              >
                {machine.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-bold">
            {machineInfo.machineName} : Area {machineInfo.areaNo} No.{" "}
            {machineInfo.machineNo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {/* Actual Block */}
            <Col lg={6} className="p-2">
              <Card body className="h-100 align-self-center">
                <h3 align="center" className="font-weight-bold">
                  Actual Q'ty
                </h3>
                {/* Progress bar 1 */}
                <div
                  className="mx-auto mt-5"
                  style={{ width: 300, height: 300 }}
                >
                  <CircularProgressbar
                    value={percentage}
                    text={
                      !isNaN(percentage) ? `${percentage?.toFixed(2)}%` : "-"
                    }
                  />
                </div>
                {/* END */}
                {/* Demo info */}
                <div className="row text-center mt-5">
                  <div className="col-6 border-right">
                    <h1 className="font-weight-bold mb-0 text-success">
                      {machineInfo.counter}
                    </h1>
                    <span className="small text-gray">FG TOTAL</span>
                  </div>
                  {/* <div className="col-6">
                    <h1 className="font-weight-bold mb-0 text-secondary">0</h1>
                    <span className="small text-gray">NG</span>
                  </div> */}
                  <div className="col-6">
                    <h1 className="font-weight-bold mb-0 text-danger">
                      {machineInfo.target}
                    </h1>
                    <span className="small text-gray">TARGET</span>
                  </div>
                </div>
                {/* END */}
              </Card>
            </Col>
            {/* Product Info */}
            <Col lg={6}>
              <Row>
                <Col xs={12} className="p-2">
                  <Card className="border-0 h-100">
                    {/* Product Info Header */}
                    <Card.Header>
                      <h3 className="font-weight-bold">
                        Production Information
                      </h3>
                    </Card.Header>
                    {/* Product Info Body */}
                    <Card.Body>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Order ID </h4>
                        <p className="col-8"> {machineInfo.jobID || "-"} </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Part Name</h4>
                        <p className="col-8"> {machineInfo.partName || "-"} </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Part No. </h4>
                        <p className="col-8"> {machineInfo.partNo || "-"} </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Actual </h4>
                        <p className="col-8"> {machineInfo.counter || "-"} </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Target </h4>
                        <p className="col-8"> {machineInfo.target || "-"} </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">Start Date</h4>
                        <p className="col-8">
                          {machineInfo.startDate
                            ?.split("-")
                            ?.reverse()
                            ?.join("-") || "-"}
                        </p>
                      </div>
                      <div className="row mt-2">
                        <h4 className="col-4 font-weight-bolder">End Date</h4>
                        <p className="col-8">
                          {machineInfo.endDate
                            ?.split("-")
                            ?.reverse()
                            ?.join("-") || "-"}
                        </p>
                      </div>
                    </Card.Body>
                    {/* Product Info Footer */}
                    <Card.Footer>
                      <div className="d-flex">
                        {!machineInfo.jobID ? (
                          <button
                            className="btn mx-2 btn-info font-weight-bold"
                            onClick={handleShowAssign}
                          >
                            Assign
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn mx-2 btn-info font-weight-bold"
                              onClick={handleShowEdit}
                            >
                              Edit Job
                            </button>
                            <button
                              className="btn mx-2 btn-info font-weight-bold"
                              onClick={handleShowCloseJob}
                            >
                              Close Job
                            </button>
                          </>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col xs={12} className="p-2">
                  <Card className="h-100">
                    <Card.Header>
                      <h3 className="font-weight-bold">Control</h3>
                    </Card.Header>
                    <Card.Body
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <button
                        className="btn-grad font-weight-bold mx-2"
                        onClick={() => controlMachine(machineInfo, "Start")}
                      >
                        start
                      </button>
                      <button
                        className="btn-grad font-weight-bold mx-2"
                        onClick={() => controlMachine(machineInfo, "Stop")}
                      >
                        stop
                      </button>
                      <button className="btn-grad font-weight-bold mx-2">
                        reset
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            {/* COST STD */}
            {/* <div className="col-12 p-2">
              <div className="card card-body">COST STD</div>
            </div> */}
          </Row>
        </Modal.Body>
      </Modal>

      <AssignJobModal
        show={showAssign}
        close={() => setShowAssign(false)}
        machineInfo={machineInfo}
      />

      <EditJobModal
        show={showEdit}
        close={() => setShowEdit(false)}
        machineInfo={machineInfo}
      />

      <CloseJobModal
        show={showCloseJob}
        close={() => setShowCloseJob(false)}
        machineInfo={machineInfo}
      />
    </>
  );
}
