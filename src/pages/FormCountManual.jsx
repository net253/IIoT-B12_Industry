import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function FormCountManual() {
  const [formInput, setFormInput] = useState({
    process: "",
    jobID: "",
    partName: "",
    actual: "",
    datetime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { datetime } = formInput;
    const result = { ...formInput, datetime: new Date(datetime) };
    console.log(result);

    setTimeout(handleReset, 2000);
  };

  const handleReset = () => {
    setFormInput({
      process: "",
      jobID: "",
      partName: "",
      actual: "",
      datetime: "",
    });
  };

  return (
    <Container className="py-2">
      <h1 className="text-center">Production Information Form</h1>
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group controlId="formProcess" className="mb-3" required>
          <Form.Label>Process</Form.Label>
          <Form.Control
            as="select"
            value={formInput.process}
            onChange={({ target: { value: process } }) =>
              setFormInput({ ...formInput, process })
            }
            required
          >
            <option value="">-- Please select process --</option>
            <option value="Cutting">Cutting</option>
            <option value="Bending">Bending</option>
            <option value="Forming">Forming</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formOrder" className="mb-3">
          <Form.Label>Production Order</Form.Label>
          <Form.Control
            as="select"
            value={formInput.jobID}
            onChange={({ target: { value: jobID } }) =>
              setFormInput({ ...formInput, jobID })
            }
            required
          >
            <option value="">-- Please select production order --</option>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <option key={i} value={i}>{`Order#${
                  i + 1 < 10 ? "0" + (i + 1) : i + 1
                }`}</option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Part Name</Form.Label>
          <Form.Control type="text" value={formInput.partName} disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>Actual</Form.Label>
          <Form.Control
            type="number"
            value={formInput.actual}
            onChange={({ target: { value: actual } }) =>
              setFormInput({ ...formInput, actual })
            }
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={formInput.datetime}
            onChange={({ target: { value: datetime } }) =>
              setFormInput({ ...formInput, datetime })
            }
            required
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            value={formInput.time}
            onChange={({ target: { value: time } }) =>
              setFormInput({ ...formInput, time })
            }
            required
          />
        </Form.Group> */}
        <Button variant="success" type="submit" className="w-100 mb-2">
          Confirm
        </Button>
        <Button variant="danger" type="reset" className="w-100 mb-2">
          Clear
        </Button>
      </Form>
    </Container>
  );
}
