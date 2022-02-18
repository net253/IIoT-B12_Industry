import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { updateMachineInfo } from "../../store/slices/mcInfoSlice";

export default function EditJobModal({ show, close, machineInfo }) {
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState({});

  // const handleCloseEdit = () => setShowEdit(false);

  const submitEditJob = (e) => {
    e.preventDefault();

    const reqData = { ...machineInfo, ...editForm };
    //     console.log(reqData);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do.",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5012/b12apiweb/editJob", { ...reqData })
          .then(({ data }) => {
            if (data.state) {
              dispatch(updateMachineInfo(reqData));
              Swal.fire({
                icon: "success",
                title: "Edit job successfully.",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => setEditForm({}));
            } else {
              Swal.fire({
                icon: "error",
                title: "Edit job failed.",
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
          <Modal.Title className="font-weight-bold">Edit Job</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitEditJob}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Machine Name :</Form.Label>
              <Form.Control
                type="text"
                className="my-1"
                placeholder="Part Name."
                defaultValue={machineInfo.machineName}
                disabled
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Order ID :</Form.Label>
              <Form.Control
                type="text"
                className="my-1"
                placeholder="Part Name."
                defaultValue={machineInfo.jobID}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    jobID: value,
                  })
                }
                disabled
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Part Name :</Form.Label>
              <Form.Control
                type="text"
                className="my-1"
                placeholder="Part Name."
                defaultValue={machineInfo.partName}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    partName: value,
                  })
                }
                disabled
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Part No. :</Form.Label>
              <Form.Control
                type="text"
                className="my-1"
                placeholder="Part No."
                defaultValue={machineInfo.partNo}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    partNo: value,
                  })
                }
                disabled
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Target :</Form.Label>
              <Form.Control
                type="number"
                className="my-1"
                placeholder="Target."
                defaultValue={machineInfo.target}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    target: Number(value),
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date :</Form.Label>
              <Form.Control
                type="date"
                className="my-1"
                placeholder="Start Date."
                defaultValue={machineInfo.startDate}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    startDate: value,
                  })
                }
                disabled
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date :</Form.Label>
              <Form.Control
                type="date"
                className="my-1"
                placeholder="End Date."
                defaultValue={machineInfo.endDate}
                onChange={({ target: { value } }) =>
                  setEditForm({
                    ...editForm,
                    endDate: value,
                  })
                }
                disabled
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={close}>
              Close
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
