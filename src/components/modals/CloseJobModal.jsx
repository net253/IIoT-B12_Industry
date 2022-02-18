import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { updateMachineInfo } from "../../store/slices/mcInfoSlice";

export default function CloseJobModal({ show, close, machineInfo }) {
  const dispatch = useDispatch();
  // const handleExit = () => setShowCloseJob(false);
  const [formCloseJob, setFormCloseJob] = useState({ ng: "" });

  const submitCloseJob = (e) => {
    e.preventDefault();
    const ngCause = "";

    const reqData = { ...machineInfo, ...formCloseJob, ngCause };
    //     console.log(reqData);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to close job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do.",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5012/b12apiweb/closeJob", { ...reqData })
          .then(({ data }) => {
            if (data.state) {
              const { areaNo, machineNo, machineType, machineName } = reqData;
              dispatch(
                updateMachineInfo({
                  areaNo,
                  machineNo,
                  machineType,
                  machineName,
                })
              );
              Swal.fire({
                icon: "success",
                title: "Close job complete.",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => setFormCloseJob({ ng: "" }));
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Can't close this job.",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Modal size="md" show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Close Job</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitCloseJob}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNG">
              <Form.Label>NG</Form.Label>
              <Form.Control
                type="number"
                placeholder="NG Quantity"
                defaultValue={formCloseJob.ng}
                onChange={({ target: { value } }) =>
                  setFormCloseJob({
                    ...formCloseJob,
                    ng: Number(value),
                  })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={close}>
              ปิด
            </Button>
            <Button variant="success" type="submit">
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
