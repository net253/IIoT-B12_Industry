import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import { updateMachineInfo } from "../../store/slices/mcInfoSlice";

export default function AssignJobModal({ show, close, machineInfo }) {
  // const handleCloseAssign = () => setShowAssign(false);
  const [formAssign, setFormAssign] = useState({ mode: "sap" });

  const sapOrder = useSelector((state) => state.sap);

  const dispatch = useDispatch();

  const autoFill = ({ target: { value } }) => {
    const jobID = value;
    const {
      PARTNAME: partName,
      PARTNO: partNo,
      TARGET: target,
    } = sapOrder.find(({ ORDER_ID }) => ORDER_ID === jobID);
    setFormAssign({
      ...formAssign,
      jobID,
      partName,
      partNo,
      target,
      startDate: "2021-01-01",
      endDate: "2021-12-31",
    });
  };

  const submitAssignForm = (e) => {
    e.preventDefault();

    const reqData = { ...machineInfo, ...formAssign };
    console.log(reqData);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to assign job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do.",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(reqData);
        axios
          .post("http://localhost:5012/b12apiweb/openJob", { ...reqData })
          .then(({ data }) => {
            if (data.state) {
              dispatch(updateMachineInfo(reqData));
              Swal.fire({
                icon: "success",
                title: "Assign job success.",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setFormAssign({ mode: "sap" });
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Assign job failed.",
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
          <Modal.Title>ASSIGN JOB</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitAssignForm}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formAssignMode">
              <Form.Check
                type="radio"
                label="Assign job by SAP"
                name="assignMode"
                id="assignMode1"
                value="sap"
                defaultChecked
                onClick={(e) => {
                  setFormAssign({ ...formAssign, mode: e.target.value });
                }}
                required
              />
              <Form.Check
                type="radio"
                label="Assign job by Manual"
                name="assignMode"
                id="assignMode2"
                value="manual"
                onClick={({ target: { value } }) => {
                  setFormAssign({ ...formAssign, mode: value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMachineName">
              <Form.Label>Machine Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={machineInfo.machineName}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrderID">
              <Form.Label>Order ID</Form.Label>
              {formAssign.mode === "manual" ? (
                <Form.Control
                  type="text"
                  placeholder="Order ID"
                  onChange={({ target: { value } }) => {
                    setFormAssign({ ...formAssign, jobID: value });
                  }}
                  required
                />
              ) : (
                <select className="form-control" onChange={autoFill} required>
                  <option value="">-- Please select Order ID --</option>
                  {sapOrder.map((sap, index) => (
                    <option key={index} value={sap.ORDER_ID}>
                      {sap.ORDER_ID} {sap.PARTNAME}
                    </option>
                  ))}
                </select>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPartName">
              <Form.Label>Part Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Part Name"
                disabled={formAssign.mode === "sap"}
                defaultValue={formAssign?.partName}
                onChange={({ target: { value } }) => {
                  setFormAssign({ ...formAssign, partName: value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPartNo">
              <Form.Label>Part Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Part No"
                disabled={formAssign.mode === "sap"}
                defaultValue={formAssign?.partNo}
                onChange={({ target: { value } }) => {
                  setFormAssign({ ...formAssign, partNo: value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTarget">
              <Form.Label>Target</Form.Label>
              <Form.Control
                type="number"
                placeholder="Target"
                disabled={formAssign.mode === "sap"}
                defaultValue={formAssign?.target}
                onChange={(e) => {
                  setFormAssign({ ...formAssign, target: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                disabled={formAssign.mode === "sap"}
                defaultValue={formAssign?.startDate}
                onChange={({ target: { value } }) => {
                  setFormAssign({ ...formAssign, startDate: value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                disabled={formAssign.mode === "sap"}
                defaultValue={formAssign?.endDate}
                onChange={({ target: { value } }) => {
                  setFormAssign({ ...formAssign, endDate: value });
                }}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={close}>
              close
            </Button>
            <Button variant="success" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
