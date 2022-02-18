import React, { useState } from "react";
import { Row, Col, Table, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { EditJobModal, CloseJobModal } from "../components/modals";

export default function OverviewTable() {
  const [processInfo, setProcessInfo] = useState([]);
  const allMC = useSelector((state) => state.allMC);

  const [showEditJob, setShowEditJob] = useState(false);
  const [showCloseJob, setShowCloseJob] = useState(false);
  const [machineInfo, setMachineInfo] = useState({});

  const handleShowEdit = (info) => {
    setShowEditJob(true);
    setMachineInfo(info);
  };
  const handleShowClose = (info) => {
    setShowCloseJob(true);
    setMachineInfo(info);
  };

  const setProcess = (process) => {
    setProcessInfo(
      allMC.filter(
        ({ machineType, jobID }) => machineType === process && jobID.length > 0
      )
    );
  };

  const mapStatus = (status) => {
    return status === "Online"
      ? "success"
      : status === "Stop"
      ? "danger blink-status"
      : status === "Alarm"
      ? "warning blink-status"
      : "secondary";
  };

  const buttonSetProcess = ["CUTTING", "BENDING", "END-FORMING", "MULTI-TOOLS"];

  return (
    <>
      <Row>
        <Col xs={12} className="pt-2">
          <Card>
            <Card.Header>
              {buttonSetProcess.map((process, i) => (
                <Button
                  key={i}
                  className="mx-1"
                  onClick={() => setProcess(process)}
                >
                  {process}
                </Button>
              ))}
            </Card.Header>
            <Card.Body className="box-content overflow-auto">
              <Table striped bordered hover size="md">
                <thead className="thead-dark text-nowrap">
                  <tr align="center">
                    <th scope="col" style={{ width: "5%" }}>
                      Line
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Order ID
                    </th>
                    <th scope="col" style={{ width: "25%" }}>
                      Part Name
                    </th>
                    {/* <th scope="col">Part No</th> */}
                    {/* <th scope="col">Start Date</th> */}
                    {/* <th scope="col">End Date</th> */}
                    <th scope="col">Actual</th>
                    <th scope="col">Target</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{ width: "15%" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-nowrap">
                  {processInfo.length === 0 ? (
                    <tr className="text-center h2">
                      <th colSpan="10">Not job.</th>
                    </tr>
                  ) : (
                    processInfo.map((info, i) => (
                      <tr key={i} align="center">
                        <th scope="row">{info.line}</th>
                        <td>{info.jobID}</td>
                        <td>{info.partName}</td>
                        {/* <td>{info.partNo}</td> */}
                        {/* <td>{info.startDate}</td> */}
                        {/* <td>{info.endDate}</td> */}
                        <td>{info.counter}</td>
                        <td>{info.target}</td>
                        <td>
                          <span
                            className={"badge badge-" + mapStatus(info.status)}
                          >
                            {info.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            className="mx-1"
                            style={{ fontSize: ".8em" }}
                            onClick={() => handleShowEdit(info)}
                          >
                            <i className="fas fa-edit" />
                          </Button>
                          <Button
                            variant="danger"
                            className="mx-1"
                            style={{ fontSize: ".8em" }}
                            onClick={() => handleShowClose(info)}
                          >
                            <i className="fas fa-redo-alt" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <EditJobModal
            show={showEditJob}
            close={() => setShowEditJob(false)}
            machineInfo={machineInfo}
          />

          <CloseJobModal
            show={showCloseJob}
            close={() => setShowCloseJob(false)}
            machineInfo={machineInfo}
          />
        </Col>
      </Row>
    </>
  );
}
